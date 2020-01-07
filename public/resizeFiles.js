const fs = require("fs");
const path = require("path");

const resizeFiles = (w, data) => {
  return w.send(JSON.stringify(data));
};
