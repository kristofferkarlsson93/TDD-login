module.exports = function validatePasswordAndSuggestErrorResponse(password) {
  if (!password) {
    throw 'MISSING_PASSWORD'
  }
  return true;
}