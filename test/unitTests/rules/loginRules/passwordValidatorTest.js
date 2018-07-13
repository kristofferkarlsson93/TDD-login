const chai = require('chai');
const should = chai.should();
const validatePasswordAndSuggestErrorResponse = require('../../../../app/validation/loginValidators/passwordValidator');

describe('PasswordValidator', () => {
  it('should throw if password is empty',() => {
    should.throw(() => validatePasswordAndSuggestErrorResponse(''))
  })
  it('should return true if valid password', () => {
    validatePasswordAndSuggestErrorResponse('password123');
  })
})