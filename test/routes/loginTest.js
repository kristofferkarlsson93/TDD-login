const chai = require('chai');
const should = chai.should();
const server = require('../../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let app = chai.request(server)

const testThatDataHasStatus = require('./utils').testThatDataHasStatus;
const testThatDataHasErrorStructure = require('./utils').testThatDataHasErrorStructure;
const testThatDataHasErrorCode = require('./utils').testThatDataHasErrorCode;

describe('Logging in', () => {

  beforeEach(done => {
    app = chai.request(server)
    done()
  }),
  afterEach( done => {
    server.stop()
    done();
  }),

  it('Should not be possible without username', async () => {
    return await app.post('/login')
      .then(res => {
        testThatDataHasStatus(400, res);
        testThatDataHasErrorStructure(res);
        testThatDataHasErrorCode('MISSING_USERNAME', res);
      });
  }),

  it('Should not be possible without password', async () => {
    return await app.post('/login')
      .send({username: 'krikar'})
      .then(res => {
        testThatDataHasStatus(400, res);        
        testThatDataHasErrorStructure(res);
        testThatDataHasErrorCode('MISSING_PASSWORD', res);
      });
  }),

  it('Should not be possible with unknown username', async() => {
    return await app.post('/login')
      .send({username: 'unknownUsername', password: 'password123'})
      .then(res => {
        testThatDataHasStatus(400, res);        
        testThatDataHasErrorStructure(res);
        testThatDataHasErrorCode('UNKNOWN_USERNAME', res)
      })
  }),

  it('Should not be possible with invalid password', async() => {
    return await app.post('/login')
      .send({username: 'krikar', password: 'invalidPassword'})
      .then(res => {
        testThatDataHasStatus(400, res);        
        testThatDataHasErrorStructure(res);
        testThatDataHasErrorCode('INVALID_PASSWORD', res)
      })
  })

  it('Should return a json web token on successful login', async ()=> {
    return await app.post('/login')
      .send({username: 'krikar', password: 'pass123'})
      .then(res => {
        testThatDataHasStatus(200, res);
        res.should.have.property('body')
        res.body.should.have.property('token');
      });
  })
})