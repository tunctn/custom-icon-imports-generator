const fs = require("fs");
const { PATHS } = require("../constants");
const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");

module.exports = (files) => {
  let autoMessage = "/* This file is auto-generated */\n";
  let gitHub =
    "/* https://github.com/tunctn/custom-icon-imports-generator */\n\n";
  let react = `import React from "react";\n\n`;
  let lib = `import * as i from "./lib";\n`;
  let svgItem = `import S from "./SvgItem";\n\n`;

  let imports = ``;
  files.forEach((file) => {
    imports =
      imports +
      `export const Ci${capitalizeFirstLetter(file.name)}=p=><S {...p} i={i.${
        file.name
      }} />\n`;
  });

  const file = autoMessage + gitHub + react + lib + svgItem + imports;
  fs.writeFile(`${PATHS.OUTPUT}index.js`, file, "utf8", () => {});
};
