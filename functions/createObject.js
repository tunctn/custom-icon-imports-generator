const normalizeName = require("../utils/normalizeName");

module.exports = (files) => {
  let object = {};

  files.forEach((file) => {
    if (file.isFilled) {
      object[file.iconDefaultName] = {
        ...object[file.iconDefaultName],
        filled: { d: file.pathD, viewBox: file.viewBox },
      };
    } else {
      object[file.iconDefaultName] = {
        ...object[file.iconDefaultName],
        normal: { d: file.pathD, viewBox: file.viewBox },
      };
    }
  });

  return JSON.stringify(object);
};
