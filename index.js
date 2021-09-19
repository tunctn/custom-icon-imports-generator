const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

String.prototype.replaceAll = function (search, replacement) {
  return this.replace(new RegExp(search, "g"), replacement);
};

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const inputsPath = "./inputs/";
const localInputsPath = "./inputs.local/";
const outputsPath = "./outputs/";

const handleFolders = () => {
  fs.rmdirSync(outputsPath, { recursive: true });
  fs.mkdirSync(outputsPath, { recursive: true });
};

const searchForInputFolder = () => {
  let inputDirectory = inputsPath;
  let error = false;

  try {
    if (fs.existsSync(localInputsPath)) {
      inputDirectory = localInputsPath;
    } else {
      error = true;
      console.log(`${inputsPath} does not exist.`);
      fs.mkdirSync(inputsPath, { recursive: true });
      console.log(`${inputsPath} created.`);
    }
  } catch (e) {
    error = true;
    console.log("An error occurred.", e);
  }

  if (error) {
    return {
      error: `Please put your icons into ${inputsPath} directory and re-run the script.`,
    };
  } else {
    return { directory: inputDirectory };
  }
};

const getAttributes = (directory) => {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .filter((file) => file.name !== ".DS_Store")
    .map((file) => {
      const name = file.name.replace(".svg", "");

      let data = fs
        .readFileSync(`${directory}${file.name}`, "utf8")
        .toString()
        .replaceAll(`'`, `"`);

      let dom = new JSDOM(data);
      dom = dom.window.document;

      const svgAttr = dom.querySelector("svg").attributes;
      const svg = {
        viewBox: "",
      };
      Array.prototype.slice
        .call(svgAttr)
        .map((item) => item)
        .filter((item) => item !== undefined)
        .forEach((item) => (svg[item.name] = item.value));

      const pathAttr = dom.querySelector("path").attributes;
      const path = {
        d: "",
      };
      Array.prototype.slice
        .call(pathAttr)
        .map((item) => item)
        .filter((item) => item !== undefined)
        .forEach((item) => (path[item.name] = item.value));

      const viewBox = svg.viewBox;
      const pathD = path.d;

      return {
        name,
        viewBox,
        pathD,
      };
    });
};

const createObject = (files) => {
  let object = {};
  files.forEach((file) => {
    object[file.name] = { d: file.pathD, viewBox: file.viewBox };
  });

  return JSON.stringify(object);
};

const saveObjectAsJSON = (object) => {
  fs.writeFile("./outputs/lib.json", object, "utf8", () => {});
};

const createEs6Import = (files) => {
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
      `export const Ci${file.name.capitalizeFirstLetter()}=p=><S {...p} i={i.${
        file.name
      }} />\n`;
  });

  const file = autoMessage + gitHub + react + lib + svgItem + imports;
  fs.writeFile("./outputs/index.js", file, "utf8", () => {});
};

const run = async () => {
  console.clear();
  console.log("Started.");

  const folder = searchForInputFolder();
  if (folder.error) {
    console.log(folder.error);
    return;
  }

  const files = getAttributes(folder.directory);
  if (files.length === 0) {
    console.log(`Found no files. Exiting.`);
    return;
  }
  handleFolders();

  const object = createObject(files);
  saveObjectAsJSON(object);
  createEs6Import(files);

  console.log("You can find your exports in outputs folder.");
  console.log("\n");
};

run();
