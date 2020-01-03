import React from "react";

import WsContext from "./WsContext";

function Photos() {
  const req = React.useContext(WsContext);
  const [dir, dirSet] = React.useState();
  const [status, statusSet] = React.useState("");

  const updateStatus = (msg, time = 2000) => {
    statusSet(msg);
    setTimeout(() => statusSet(""), time);
  };

  const handleSelectDirectory = () => {
    req && req("getDir").then(r => dirSet(r.response.filePaths[0]));
  };
  const handleProcessFiles = () => {
    if (!req) return console.log("Error! ws connection down.");
    req("getFiles", [dir]).then(r => console.log(r));
  };
  const handleResetData = () => {
    req &&
      req("resetTestData")
        .then(r => updateStatus(r.value))
        .catch(r => updateStatus(r.value));
  };
  return (
    <div>
      <h1>Photo Processing</h1>
      <button onClick={handleResetData}>Reset Data</button>
      <button onClick={handleSelectDirectory}>Select Directory</button>
      {!dir ? <span>no directory selected</span> : <span>{dir}</span>}
      <button onClick={handleProcessFiles} disabled={!dir}>
        Process Pics
      </button>
      <div className="status">{status}</div>
    </div>
  );
}

export default Photos;
