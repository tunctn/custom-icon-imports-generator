const fs = require("fs");
const { PATHS } = require("../constants");

module.exports = () => {
  fs.rmdirSync(PATHS.OUTPUT, { recursive: true });
  fs.mkdirSync(PATHS.OUTPUT, { recursive: true });
};
