const errorHelpers = require('../helpers/errorResponseHelpers');

module.exports = (controller, request, response) => {
  if (!controller.invoke) {
    throw Error('Missing invoke function');
  }
  try {
    const result = controller.invoke(request.body);
    return response.status(200).json(result);
  } catch (error) {
    const status = errorHelpers.getStatusForErrorCode(error);
    const body = errorHelpers.buildErrorResponse(error);
    return response.status(status).json(body);
  }
}