const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiJWT = require('chai-jwt');
const controller = require('../../../app/controllers/loginWithUsernameAndPasswordController');

describe('loginWithUsernameAndPasswordControllerTest', () => {

  it('Throws when request does not contain username', () => {
    let error = undefined;
    try {
      controller.invoke({username: ''});
    } catch (e) {
      error = e;
    } finally {
      error.should.equal('MISSING_USERNAME');
    }
  });

  it('Throws when request does not contain password', () => {
    let error = undefined;
    try {
      controller.invoke({username: 'krikar', password: ''});
    } catch (e) {
      error = e;
    } finally {
      error.should.equal('MISSING_PASSWORD');
    }
  });

  it ('Throws when request has unknown username', () => {
    let error = undefined;
    try {
      controller.invoke({username: 'unknown_baby', password: 'pass123'});
    } catch (e) {
      error = e;
    } finally {
      error.should.equal('UNKNOWN_USERNAME');
    }
  })

  it ('Throws when request has mismatching password', () => {
    let error = undefined;
    try {
      controller.invoke({username: 'krikar', password: 'wrong_pass'});
    } catch (e) {
      error = e;
    } finally {
      error.should.equal('INVALID_PASSWORD');
    }
  })

  it('Returns a JWT when password and username is correct', () => {
    const {token} = controller.invoke({username: 'krikar', password: 'pass123'});
    expect(token).to.be.a.jwt;
  })
})

