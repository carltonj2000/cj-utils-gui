const fs = require("fs");
const path = require("path");

const getFiles = (w, data) => {
  if (!data.dir)
    return w.send(
      JSON.stringify({
        cmd: "Error",
        id: data.id,
        value: "No directory provided as argument."
      })
    );
  fs.readdir(data.dir, (err, files) => {
    if (err)
      return w.send(
        JSON.stringify({
          cmd: "Error",
          id: data.id,
          value: "Reading files from " + data.dir
        })
      );
    const fileNdir = files.map(file => {
      const isDir = fs.lstatSync(path.join(data.dir, file)).isDirectory();
      return { name: file, isDir, dir: data.dir };
    });
    return w.send(
      JSON.stringify({
        cmd: data.cmd,
        id: data.id,
        files: fileNdir
      })
    );
  });
};

module.exports = {
  getFiles
};
