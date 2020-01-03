const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const cwd = "/Users/carltonjoseph/dogs";

const resetTestData = (w, data) => {
  if (!fs.existsSync(`${cwd}Ori`))
    return w.send(
      JSON.stringify({
        cmd: "Error",
        id: data.id,
        value: "Test data dir not present."
      })
    );
  execSync(`rm -rf ${cwd}`);
  execSync(`cp -R ${cwd}ori ${cwd}`);
  return w.send(
    JSON.stringify({
      cmd: data.cmd,
      id: data.id,
      value: "Test data dir reset."
    })
  );
};

module.exports = {
  resetTestData
};
