const { dialog } = require("electron");
const fs = require("fs");

const handleMessage = (win, w) => dataIn => {
  // console.log(dataIn); // for debug
  const data = JSON.parse(dataIn);
  if (!data.cmd)
    return w.send(
      JSON.stringify({ cmd: "Error", id: 3, value: "No command provided." })
    );
  const { cmd } = data;
  console.log(data);
  switch (data.cmd) {
    case "pong":
      break;
    case "getDir":
      dialog
        .showOpenDialog(win, {
          properties: ["openDirectory"]
        })
        .then(d =>
          w.send(
            JSON.stringify({
              cmd: data.cmd,
              id: data.id,
              response: d
            })
          )
        )
        .catch(e => console.log("Dir access failed.", e));
      break;
    case "getFiles":
      console.log("getting files", data);
      break;
    default:
      console.log("Warning! Unknown command:", cmd);
  }
};

module.exports = {
  handleMessage
};
