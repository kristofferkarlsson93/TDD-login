const userProvider = require('../providers/userProvider');
const errorHelpers = require('../helpers/errorResponseHelpers');
const controllerInvoker = require('../controllers/controllerInvoker');

module.exports = (app) => {

  app.post('/login', (request, response) => {
    const controller = require('../controllers/loginWithUsernameAndPasswordController');
    controllerInvoker(controller, request, response);
  });

  app.post('/login/email', (request, response) => {
    const controller = require('../controllers/loginWithEmailAndPasswordController');
    controllerInvoker(controller, request, response);
  });
}
