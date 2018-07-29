const errorCodes = require('../constants/errors').codes;
const userProvider = require('../providers/userProvider');
const authHelper = require('../helpers/authHelper');

module.exports.invoke = (requestBody) => {
  const { email, password } = requestBody;
  if(!email) {
    throw errorCodes.MISSING_EMAIL;
  } else if (!password) {
    throw errorCodes.MISSING_PASSWORD;
  }
  const user = userProvider.getByEmail(email);
  if (!user) {
    throw errorCodes.UNKNOWN_EMAIL
  } else if (user.password !== password) {
    throw errorCodes.INVALID_PASSWORD;
  }
  const token = authHelper.getTokenForUser(user.id)
  return {token};
};