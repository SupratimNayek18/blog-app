const fs = require("fs").promises;

exports.readFile = async (path) => {
  var data = await fs.readFile(path);
  return JSON.parse(data.toString());
};

exports.writeFile = async (path, data) => {
  return fs.writeFile(path, JSON.stringify(data));
};
