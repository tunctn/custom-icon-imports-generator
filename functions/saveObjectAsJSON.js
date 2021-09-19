const fs = require("fs");
const { PATHS } = require("../constants");

module.exports = (object) => {
  fs.writeFile(`${PATHS.OUTPUT}lib.json`, object, "utf8", () => {});
};
