const userProvider = require('../providers/userProvider');

module.exports = (app) => {

  app.post('/login', (request, response) => {
    const controller = require('../controllers/loginWithUsernameAndPasswordController');
    const result = controller.invoke(request.body);
    
    response.status(result.status).json(result.body);
  });
}
