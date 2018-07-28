const userProvider = require('../providers/userProvider');
const errorHelpers = require('../helpers/errorResponseHelpers');

module.exports = (app) => {

  app.post('/login', (request, response) => {
    const controller = require('../controllers/loginWithUsernameAndPasswordController');
    try {
      const result = controller.invoke(request.body);
      response.status(200).json(result);
    } catch (error) {
      const status = errorHelpers.getStatusForErrorCode(error);
      const body = errorHelpers.buildErrorResponse(error);
      response.status(status).json(body);
    }
  });
}
