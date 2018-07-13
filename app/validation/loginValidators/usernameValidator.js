module.exports = function validateUsernameAndSuggestErrorResponse(username) {
  if (!username) {
    throw 'MISSING_USERNAME'
  } 
  if (username.length < 3) {
    throw 'USERNAME_TO_SHORT';
  }
  if (username.length > 8) {
    throw 'USERNAME_TO_LONG';
  }
  if (username.indexOf(' ') > -1) {
    throw 'INVALID_USERNAME';
  }
  return true;
}
