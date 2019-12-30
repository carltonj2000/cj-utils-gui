import React from "react";

import WsContext from "./WsContext";

function Photos() {
  const req = React.useContext(WsContext);
  const [dir, dirSet] = React.useState();
  const handleSelectDirectory = () => {
    req && req("getDir").then(r => dirSet(r.response.filePaths[0]));
  };
  const handleProcessFiles = () => {
    if (!req) return console.log("Error! ws connection down.");
    req("getFiles", [dir]).then(r => console.log(r));
  };
  return (
    <div>
      <h1>Photo Processing</h1>
      <button onClick={handleSelectDirectory}>Select Directory</button>
      {!dir ? <span>no directory selected</span> : <span>{dir}</span>}
      <button onClick={handleProcessFiles} disabled={!dir}>
        Process Pics
      </button>
    </div>
  );
}

export default Photos;
