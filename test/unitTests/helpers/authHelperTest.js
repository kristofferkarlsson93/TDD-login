const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiJWT = require('chai-jwt');
chai.use(chaiJWT);
const getTokenForUser = require('../../../app/helpers/authHelper').getTokenForUser;

describe('getTokenForUser', () => {
  it('Throws if no userId is provided', () => {
    should.throw(() => getTokenForUser(), Error, 'Missing username');
  });

  it('Creates a valid JWT', () => {
    expect(getTokenForUser(1)).to.be.a.jwt;
  })

  it('returns a JWT containing the given userId', () => {
    expect(getTokenForUser(1)).to.be.a.jwt.and.have.claim('userId')
  })

})
