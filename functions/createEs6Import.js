const fs = require("fs");
const { PATHS } = require("../constants");
const normalizeName = require("../utils/normalizeName");

module.exports = (files, object) => {
  let autoMessage = "/* This file is auto-generated */\n";
  let gitHub =
    "/* https://github.com/tunctn/custom-icon-imports-generator */\n\n";
  let iconObject = `export const icons: any = ` + object + `;\n\n`;

  let iconKeys = `export type IconKeys = `;

  // full names
  // let iconKeysTmp = files.map((file) => `"` + file.name + `"`).join(" | ");

  // only normals
  let iconKeysTmp = files
    .filter((file) => !file.isFilled)
    .map((file) => `"` + file.name + `"`)
    .join(" | ");

  iconKeys = iconKeys + iconKeysTmp + ";\n\n";

  const file = autoMessage + gitHub + iconKeys + iconObject;
  fs.writeFile(`${PATHS.OUTPUT}lib.ts`, file, "utf8", () => {});
};
