const userStorage = require('../../storage/userStorage');

module.exports.getByUsername = (username) => {
  const user = userStorage.find(user => user.username === username);
  if (user) return user;
  return null;
}

module.exports.getByEmail = email => {
  const user = userStorage.find(user => user.email === email);
  if (user) {
    return user;
  }
  return null;
}