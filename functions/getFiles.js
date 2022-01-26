const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const replaceAll = require("../utils/replaceAll");

const getAttributes = (dom, node) => {
  const svgAttr = dom.querySelector(node).attributes;
  let obj = {};
  Array.prototype.slice
    .call(svgAttr)
    .map((item) => item)
    .filter((item) => item !== undefined)
    .forEach((item) => (obj[item.name] = item.value));

  return obj;
};

module.exports = (directory) => {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .filter((file) => file.name !== ".DS_Store")
    .map((file) => {
      let name = file.name
        .replace(".svg", "")
        .replace("icons8-", "")
        .replace(" (1)", "-filled");

      let data = fs.readFileSync(`${directory}${file.name}`, "utf8").toString();

      if (file.name !== `${name}.svg`) {
        fs.rename(`${directory}${file.name}`, `${directory}${name}.svg`, () =>
          console.log(`file renamed from ${file.name} to ${name}.svg`)
        );
      }

      data = replaceAll(data, `'`, `"`);

      let dom = new JSDOM(data);
      dom = dom.window.document;

      const svg = getAttributes(dom, "svg");
      const path = getAttributes(dom, "path");

      const viewBox = svg.viewBox;
      const pathD = path.d;

      return {
        name,
        viewBox,
        pathD,
      };
    });
};
