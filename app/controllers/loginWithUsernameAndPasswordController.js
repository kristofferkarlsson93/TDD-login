const userProvider = require('../providers/userProvider');
const errorCodes = require('../constants/errors').codes
const authHelper = require('../helpers/authHelper');

module.exports.invoke = (requestBody) => {
  const { username, password } = requestBody;
  if (!username) {
    throw errorCodes.MISSING_USERNAME;
  } else if (!password) {
    throw errorCodes.MISSING_PASSWORD;
  }
  const user = userProvider.getByUsername(username);
  if (!user) {
    throw errorCodes.UNKNOWN_USERNAME;
  } else if (user.password !== password) {
    throw errorCodes.INVALID_PASSWORD;
  }
  const authToken = authHelper.getTokenForUser(user.id);
  return {token: authToken};
}