const userStorage = require('../../storage/userStorage');

module.exports.getByUsername = (username) => {
  const user = userStorage.find(user => user.username === username);
  if (user) return user;
  return null;
}