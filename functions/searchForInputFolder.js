const fs = require("fs");
const { PATHS } = require("../constants");

module.exports = () => {
  let inputDirectory = PATHS.INPUT;
  let error = false;

  try {
    if (fs.existsSync(PATHS.INPUT_LOCAL)) {
      inputDirectory = PATHS.INPUT_LOCAL;
    } else {
      error = true;
      console.log(`${PATHS.INPUT} does not exist.`);
      fs.mkdirSync(PATHS.INPUT, { recursive: true });
      console.log(`${PATHS.INPUT} created.`);
    }
  } catch (e) {
    error = true;
    console.log("An error occurred.", e);
  }

  if (error) {
    return {
      error: `Please put your icons into ${PATHS.INPUT} directory and re-run the script.`,
    };
  } else {
    return { directory: inputDirectory };
  }
};
