// Requirements
const fs = require('fs');
const util = require('util');

// readFromFile code
const readFromFile = util.promisify(fs.readFile);

// writeToFile code
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// readAndAppend code
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// Export as const
module.exports = { readFromFile, writeToFile, readAndAppend };
