import React from "react";
import uuid from "uuid";

export default () => {
  const [ws, wsSet] = React.useState(null);
  const [wsEvent, wsEventSet] = React.useState(null);
  const [reqs, reqsSet] = React.useState({
    "1": { cmd: "ping", value: "server up" } // expected from server
  });

  React.useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:1040");
    wsSet(socket);
    socket.onopen = () =>
      socket.send(
        JSON.stringify({ cmd: "pong", value: "Interface Up.", id: 2 })
      );
    socket.onmessage = wsEventSet;
  }, []);

  React.useEffect(() => {
    if (!wsEvent) return;
    const event = wsEvent;
    wsEventSet(null);
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
    if (data.cmd === "error") return req.reject && req.reject(data);
    else req.resolve && req.resolve(data);
  }, [reqs, wsEvent]);

  const req = (cmd, args = []) => {
    let res;
    let rej;
    const p = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    const id = uuid.v4();
    const startTime = new Date().getTime();
    const req = { [id]: { cmd, reject: rej, resolve: res, startTime } };
    reqsSet(r => ({ ...r, ...req }));
    if (!ws) {
      const msg = "Warning. Websocket down." + cmd;
      console.log(msg);
      rej(msg);
    } else ws.send(JSON.stringify({ cmd, id, args }));
    return p;
  };
  return [req];
};
