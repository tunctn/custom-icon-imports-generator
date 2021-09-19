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
      const name = file.name.replace(".svg", "");

      let data = fs.readFileSync(`${directory}${file.name}`, "utf8").toString();
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
