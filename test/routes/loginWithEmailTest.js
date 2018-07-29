const chai = require('chai');
const should = chai.should();
const server = require('../../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let app = chai.request(server);
const {
  testThatDataHasStatus,
  testThatDataHasErrorStructure,
  testThatDataHasErrorCode
} = require('./utils');

describe('Logging in with email and password', () => {

  beforeEach(done => {
    app = chai.request(server)
    done()
  }),
  afterEach( done => {
    server.stop()
    done();
  }),

  it('Should not be possible without email', async () => {
    return await app.post('/login/email')
      .send({})
      .then(res => {
        testThatDataHasStatus(400, res);
        testThatDataHasErrorStructure(res);
        testThatDataHasErrorCode('MISSING_EMAIL', res);
      });
  })

  it ('Should not be possible without password', async() => {
    return await app.post('/login/email')
      .send({email: 'krikar@mailse'})
      .then(res => {
        testThatDataHasStatus(400, res);
        testThatDataHasErrorStructure(res);
        testThatDataHasErrorCode('MISSING_PASSWORD', res);
      });
  })

  it('Should not be possible with unknown email', async() => {
    return await app.post('/login/email')
      .send({email: 'unknown@email.se', password: 'pass123'})
      .then(res => {
        testThatDataHasStatus(400, res);
        testThatDataHasErrorStructure(res);
        testThatDataHasErrorCode('UNKNOWN_EMAIL', res);
      });
  })

  it('Should not be possible with invalid password', async() => {
    return await app.post('/login/email')
      .send({email: 'krikar@mail.se', password: 'invalidPass'})
      .then(res => {
        testThatDataHasStatus(400, res);
        testThatDataHasErrorStructure(res);
        testThatDataHasErrorCode('INVALID_PASSWORD', res);
      });
  })

  it('Should return a JWT on successful login', async() => {
    return await app.post('/login/email')
      .send({email: 'krikar@mail.se', password: 'pass123'})
      .then(res => {
        testThatDataHasStatus(200, res);
        res.should.have.property('body')
        res.body.should.have.property('token')
      });
  })
})