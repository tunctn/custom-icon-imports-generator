const fs = require("fs");
const { PATHS } = require("../constants");

module.exports = () => {
  fs.rmSync(PATHS.OUTPUT, { recursive: true });
  fs.mkdirSync(PATHS.OUTPUT, { recursive: true });
};
