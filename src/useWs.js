import React from "react";
import uuid from "uuid";

const initialState = [];

export default () => {
  const [ws, wsSet] = React.useState(null);
  const [wsEvents, wsEventsSet] = React.useState([]);
  const [busy, busySet] = React.useState(false);
  const [reqs, reqsSet] = React.useState({
    "1": { cmd: "ping", value: "server up" } // expected from server
  });

  React.useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:1040");
    socket.onopen = () => {
      wsSet(socket);
      socket.send(
        JSON.stringify({ cmd: "pong", value: "Interface Up.", id: 2 })
      );
    };
    socket.onmessage = e => wsEventsSet(ori => [...ori, e]);
  }, []);

  React.useEffect(() => {
    if (!wsEvents || wsEvents.length === 0) return;
    if (busy) return;
    busySet(true);
    let event = wsEvents[0];
    if (!event) return;
    console.log(event.data);
    const data = JSON.parse(event.data);
    if (data.id === undefined)
      return console.log("Warning! Message without ID." + data);

    reqsSet(rqs => {
      let filtered = {};
      Object.keys(rqs).forEach(rqK => {
        if (rqK !== data.id) filtered[rqK] = rqs[rqK];
      });
      return filtered;
    });

    const req = reqs[data.id];
    busySet(false);
    wsEventsSet(e => e.splice(1));
    if (data.cmd === "error") return req.reject && req.reject(data);
    else req.resolve && req.resolve(data);
  }, [reqs, wsEvents]);

  const req = React.useCallback(
    (cmd, args = {}) => {
      let res;
      let rej;
      const p = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
      const id = uuid.v4();
      args.id = id;
      const startTime = new Date().getTime();
      const req = { [id]: { cmd, reject: rej, resolve: res, startTime } };
      reqsSet(r => ({ ...r, ...req }));
      if (!ws) rej("Warning. Websocket down. " + cmd);
      else ws.send(JSON.stringify({ cmd, id, ...args }));
      return p;
    },
    [ws]
  );
  return [req];
};
