import React from "react";

import WsContext from "./WsContext";
import useWs from "./useWs";

import Photos from "./Photos";

function App() {
  const [req] = useWs();

  return (
    <WsContext.Provider value={req}>
      <div>
        <h1>Carlton's Utilities</h1>
        <Photos />
      </div>
    </WsContext.Provider>
  );
}

export default App;
