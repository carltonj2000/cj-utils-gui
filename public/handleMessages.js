const { getFiles } = require("./getFiles");
const { getDir } = require("./getDir");
const { resetTestData } = require("./resetTestData");

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
      getDir(win, w, data);
      break;
    case "getFiles":
      getFiles(w, data);
      break;
    case "resetTestData":
      resetTestData(w, data);
      break;
    default:
      console.log("Warning! Unknown command:", cmd);
  }
};

module.exports = {
  handleMessage
};
