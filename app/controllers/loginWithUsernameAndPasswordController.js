const userProvider = require('../providers/userProvider');
const errorCodes = require('../constants/errors').codes;

module.exports.invoke = (requestBody) => {
  const { username, password } = requestBody;
  if (!username) {
    throw errorCodes.MISSING_USERNAME;
  } else if (!password) {
    throw errorCodes.MISSING_PASSWORD;
  }
  const user = userProvider.getByUsername(username);
  if (!user) {
    throw errorCodes.UNKNOWN_USER;
  } else if (user.password !== password) {
    throw errorCodes.BAD_PASSWORD;
  }
}