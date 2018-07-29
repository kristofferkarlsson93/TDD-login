const chai = require('chai');
const should = chai.should();
const controllerInvoker = require('../../../app/controllers/controllerInvoker');
const controllerWithNoInvoke = require('./fakedControllers/controllerWithNoInvoke');
const loginWithUsernameController = require('../../../app/controllers/loginWithUsernameAndPasswordController');
const httpMocks = require('node-mocks-http');

describe('ControllerInvoker', () => {
  it('Throws if controller has no invoke-function', () => {
    should.throw(
      () => controllerInvoker(controllerWithNoInvoke, {}, {}), 
      Error, 
      'Missing invoke function');
  })

  it('returns an error response when given data does not satisfy the controller', () => {
    const request = httpMocks.createRequest({body: {}})
    const response = httpMocks.createResponse();
    controllerInvoker(loginWithUsernameController, request, response);
    response.statusCode.should.equal(400);
    data = JSON.parse(response._getData());
    data.should.have.property('error');
    data.error.should.have.property('code');
  })

  it('Returns an successful response when given data satisfies the controller', () => {
    const request = httpMocks.createRequest({body: {username: 'krikar', password: 'pass123'}});
    const response = httpMocks.createResponse();
    controllerInvoker(loginWithUsernameController, request, response);
    response.statusCode.should.equal(200);
    data = JSON.parse(response._getData());
    data.should.have.property('token');
  })

})