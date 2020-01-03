const fs = require("fs");
const path = require("path");

const getFiles = (w, data) => {
  if (!data.args || data.args.length === 0)
    w.send(
      JSON.stringify({
        cmd: "Error",
        id: data.id,
        value: "No directory provided as argument."
      })
    );
  fs.readdir(data.args[0], (err, files) => {
    if (err)
      return w.send(
        JSON.stringify({
          cmd: "Error",
          id: data.id,
          value: "Reading files from " + data.args[0]
        })
      );
    const fileNdir = files.map(file => {
      const isDir = fs.lstatSync(path.join(data.args[0], file)).isDirectory();
      return { file, isDir };
    });
    return w.send(
      JSON.stringify({
        cmd: data.cmd,
        id: data.id,
        dir: data.args[0],
        files: fileNdir
      })
    );
  });
};

module.exports = {
  getFiles
};
