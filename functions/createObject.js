module.exports = (files) => {
  let object = {};
  files.forEach((file) => {
    object[file.name] = { d: file.pathD, viewBox: file.viewBox };
  });

  return JSON.stringify(object);
};
