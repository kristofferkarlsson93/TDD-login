const errors = require('../constants/errors');

module.exports.getStatusForErrorCode = errorCode => {
  const status = errors.statuses[errorCode];
  if (status) {
    return status;
  } else {
    throw Error('Unknown errorCode ' + errorCode);
  }
}

module.exports.buildErrorResponse = errorCode => {
  return {
    error: {
      code: errorCode
    }
  };
}