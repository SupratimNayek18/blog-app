const { readFile, writeFile } = require("../helper/file.helper");
const path = require("path");

const PATH = path.join(__dirname, "..", "data", "user.data.json");

var findAll = () => {
  return readFile(PATH);
};

var findByUsername = async (username) => {
  var users = await readFile(PATH);
  if (users[username]) {
    return users[username];
  }
};

var checkUserName = async (username) => {
  var users = await readFile(PATH);
  if (users[username]) {
    return true;
  }
  return false;
};

var create = async (user) => {
  var users = await readFile(PATH);
  users[user.username] = user;
  return writeFile(PATH, users);
};

module.exports = {
  findAll,
  findByUsername,
  checkUserName,
  create,
};
