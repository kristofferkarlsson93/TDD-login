const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiJWT = require('chai-jwt');
chai.use(chaiJWT);
const controller = require('../../../app/controllers/loginWithEmailAndPasswordController');


describe('loginWithEmailAndPasswordController', () => {
  it('Throws when no email is provided, or value is empty', () => {
    let error = undefined;
    try {
      controller.invoke({})
    } catch (e) {
      error = e;
    } finally {
      error.should.equal('MISSING_EMAIL');
    }
  })

  it('Throws if no password is provided or value is empty', () => {
    let error = undefined;
    try {
      controller.invoke({email: 'krikar@mail.se'});
    } catch (e) {
      error = e;
    } finally {
      error.should.equal('MISSING_PASSWORD');
    }
  })

  it('Throws when no user is found with given email', () => {
    let error = undefined;
    try {
      controller.invoke({email: 'unknownBlaha@mail.se', password: 'pass123'});
    } catch (e) {
      error = e;
    } finally {
      error.should.equal('UNKNOWN_EMAIL');
    }
  })
  
  it('Throws when password is wrong', () => {
    let error = undefined;
    try {
      controller.invoke({email: 'krikar@mail.se', password: 'badPass'});
    } catch (e) {
      error = e;
    } finally {
      error.should.equal('INVALID_PASSWORD');
    }
  })

  it('Returns an object containing a jwt if email and password are correct', () => {
    const result = controller.invoke({email: 'krikar@mail.se', password: 'pass123'});
    result.should.have.property('token')
    result.token.should.be.a.jwt;
  })
})