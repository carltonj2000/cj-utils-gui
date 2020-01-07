const os = require("os");
const fs = require("fs");
const path = require("path");

const devToolMac =
  "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/";
const devToolWin =
  "/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/";
const devToolLinux = null; // tbd

const getNewExt = devToolExtP => {
  const exts = fs.readdirSync(path.join(os.homedir(), devToolExtP));
  exts.sort((a, b) => (a > b ? -1 : 1));
  return exts[0];
};

const devToolExtDir = () => {
  const devToolExtSubD =
    process.platform === "win32"
      ? devToolWin
      : process.platform === "darwin"
      ? devToolMac
      : process.platform === "linux"
      ? devToolLinux
      : null;

  if (!devToolExtSubD) return null;

  return path.join(os.homedir(), devToolExtSubD, getNewExt(devToolExtSubD));
};

module.exports = devToolExtDir;
