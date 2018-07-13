const usernameValidator = require('../validation/loginValidators/usernameValidator');
const passwordValidator = require('../validation/loginValidators/passwordValidator');
module.exports = (app) => {

  app.post('/login', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    try {
      usernameValidator(username);
      passwordValidator(password);
    } catch (error) {
      response.status(400).json({
        error: {
          code: error
        }
      })
    }
  });
}