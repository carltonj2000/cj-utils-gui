import React from "react";

import WsContext from "./WsContext";

function Photos() {
  const req = React.useContext(WsContext);
  const [dir, dirSet] = React.useState("/Users/carltonjoseph/dogs");
  const [files, filesSet] = React.useState([]);
  const [status, statusSet] = React.useState("");

  const updateStatus = (msg, time = 2000) => {
    statusSet(msg);
    setTimeout(() => statusSet(""), time);
  };

  const handleSelectDirectory = async (getDir = true) => {
    if (!req) return console.log("Error! ws connection down.");
    try {
      if (getDir) {
        const r = await req("getDir");
        dirSet(r.response.filePaths[0]);
      }
      const fls = await req("getFiles", [dir]);
      console.log("fls", fls);
    } catch (e) {
      console.log("Error! Selecting dir:", e);
    }
  };

  const handleProcessFiles = () => {
    console.log("processing");
  };
  const handleResetData = () => {
    req &&
      req("resetTestData")
        .then(r => updateStatus(r.value))
        .catch(r => updateStatus(r.value));
  };
  React.useEffect(() => {
    handleSelectDirectory(false);
  }, [req]);

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
