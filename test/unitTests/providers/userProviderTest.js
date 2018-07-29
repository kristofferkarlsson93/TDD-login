const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const { getByUsername, getByEmail } = require('../../../app/providers/userProvider');

describe('getByUsername', () => {
  it('returns null if user does not exist',() => {
    should.not.exist(getByUsername('unknown'));
  }), 
  it ('returns the user if it exists', () => {
    expect(getByUsername('krikar')).to.deep.equal({
      id: 1,
      username: 'krikar',
      password: 'pass123',
      email: 'krikar@mail.se'
    });
  })
})

describe('getByEmail', () => {
  it('returns null if no user is found', () => {
    should.not.exist(getByEmail('noUser@mail.se'));
  })
  it('returns the user if it exists', () => {
    expect(getByEmail('krikar@mail.se')).to.deep.equal({
      id: 1,
      username: 'krikar',
      password: 'pass123',
      email: 'krikar@mail.se'
    });
  })
})

