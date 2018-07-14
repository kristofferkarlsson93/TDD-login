const userProvider = require('../providers/userProvider');

module.exports = (app) => {

  app.post('/login', (request, response) => {
    const {username, password} = request.body;
    try {
      guardAgainstMissingParameters(request.body)
    } catch (error) {
      sendErrorStatus(error, response);
      return; 
    }
    const user = userProvider.getByUsername(username);
    if (!user) {
      sendErrorStatus('UNKNOWN_USERNAME', response);
    }
  });

  function sendErrorStatus(errorCode, response) {
    response.status(400).json({
      error: {
        code: errorCode
      }
    });
  }
  function guardAgainstMissingParameters(requestBody) {
    const { username, password } = requestBody;
    if (!username) {
     throw 'MISSING_USERNAME'; 
    }
    else if (!password) {
      throw 'MISSING_PASSWORD';
    }
  }
}
