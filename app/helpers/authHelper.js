const jwt = require('jsonwebtoken');
const secretKey = 'Hej!@123';

module.exports.getTokenForUser = userId => {
  if (!userId) {
    throw Error('Missing username');
  }
  return jwt.sign({
    userId: userId
  },secretKey, {
    expiresIn: '1h'
  });
}