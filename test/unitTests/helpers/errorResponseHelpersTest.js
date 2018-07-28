const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const errorResponseHelpers = require('../../../app/helpers/errorResponseHelpers')
const getStatusForErrorCode = errorResponseHelpers.getStatusForErrorCode;
const buildErrorResponse = errorResponseHelpers.buildErrorResponse;

describe('getStatusForErrorCode', () => {
  it('Returns the status for an known error', () => {
    getStatusForErrorCode('MISSING_USERNAME').should.equal(400);
  })

  it('Throws if receiving an unknown error', () => {  
    should.throw(() => getStatusForErrorCode('XXXXXXX'), Error, 'Unknown errorCode XXXXXXX');
  })
});

describe('buildErrorResponse', () => {
  it('Builds an errorResponse with correct structure', () => {
    expect(buildErrorResponse('MISSING_USERNAME'))
      .to.deep.equal({
        error: {
          code: 'MISSING_USERNAME'
        }
      });
  })
})

