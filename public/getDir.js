const { dialog } = require("electron");

const getDir = (win, w, data) => {
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
};

module.exports = {
  getDir
};
