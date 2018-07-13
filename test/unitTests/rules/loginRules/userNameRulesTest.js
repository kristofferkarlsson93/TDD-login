const chai = require('chai');
const should = chai.should();
const validateUsernameAndSuggestErrorResponse = require('../../../../app/validation/loginValidators/usernameValidator');

describe('validateUsername', () => {

  it('Should throw if username is empty', () => {
    should.throw(() => validateUsernameAndSuggestErrorResponse(''), 'MISSING_USERNAME');
  })
  it('Should throw if username is shorter than 3 chars.', () => {
    should.throw(() => validateUsernameAndSuggestErrorResponse('kr'), 'USERNAME_TO_SHORT');
  })
  it('Should throw if username is longer than 8 characters', () => {
    should.throw(() => validateUsernameAndSuggestErrorResponse('123456789'), 'USERNAME_TO_LONG');
  })
  it('Should be okay if username is above lover threshold', () => {
    validateUsernameAndSuggestErrorResponse('kri').should.equal(true);
  })
  it('Should be okay if username is below higher threshold', () => {
    validateUsernameAndSuggestErrorResponse('12345678').should.equal(true);
  })
  it('Should throw if containing space', () => {
    should.throw(() => validateUsernameAndSuggestErrorResponse('kri kar'), 'INVALID_USERNAME');
  })
})