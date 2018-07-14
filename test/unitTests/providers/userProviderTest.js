const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const getByUsername = require('../../../app/providers/userProvider').getByUsername

describe('getByUsername', () => {
  it('returns null if user does not exist',() => {
    should.not.exist(getByUsername('unknown'));
  }), 
  it ('returns the user if it exists', () => {
    expect(getByUsername('krikar')).to.deep.equal({
      id: 1,
      username: 'krikar',
      password: '???'
    });
  })
})
