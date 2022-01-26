const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");
module.exports = function (string) {
  let newString = string
    .trim()
    .toLowerCase()
    .split("-")
    .map((word) => capitalizeFirstLetter(word))
    .join("")
    .replace(/[^A-Za-z]/gi, "");

  return newString;
};
