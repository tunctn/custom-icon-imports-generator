const createOutputsFolder = require("./functions/createOutputsFolder");
const searchForInputFolder = require("./functions/searchForInputFolder");
const getFiles = require("./functions/getFiles");
const createObject = require("./functions/createObject");
const saveObjectAsJSON = require("./functions/saveObjectAsJSON");
const createEs6Import = require("./functions/createEs6Import");

const run = async () => {
  console.clear();
  console.log("Started.");

  const folder = searchForInputFolder();
  if (folder.error) {
    console.log(folder.error);
    return;
  }

  const files = getFiles(folder.directory);
  if (files.length === 0) {
    console.log(`Found no files. Exiting.`);
    return;
  }
  createOutputsFolder();

  const object = createObject(files);
  saveObjectAsJSON(object);
  createEs6Import(files);

  console.log("You can find your exports in outputs folder.");
};

run();
