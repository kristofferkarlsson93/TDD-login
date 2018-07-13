module.exports.testThatDataHasErrorStatus = (wantedStatus, data) => data.should.have.status(wantedStatus);

module.exports.testThatDataHasErrorStructure = data => {
  data.should.have.property('body');
  data.body.should.have.property('error');
  data.body.error.should.have.property('code');
}

module.exports.testThatDataHasErrorCode = (wantedErrorCode, data) => {
  data.body.error.code.should.equal(wantedErrorCode);
}