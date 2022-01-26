const normalizeName = require("../utils/normalizeName");

module.exports = (files) => {
  let object = {};

  files.forEach((file) => {
    object[normalizeName(file.name)] = { d: file.pathD, viewBox: file.viewBox };
  });

  return JSON.stringify(object);
};
