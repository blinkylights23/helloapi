'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    chaiJwt = require('chai-jwt'),
    app = require('../app'),
    config = require('config'),
    expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiJwt);

// Route that accepts a user/pw and returns a JWT token
describe('Secret', () => {
  var user, token;
  beforeEach((done) => {
    user = config.get('users').find(u => u.username == 'test');
    chai.request(app).post('/auth').send({ username: user.username, password: user.password }).end((err, res) => {
      token = res.body.token;
      done();
    });
  });

  describe('GET /secret', () => {
    it('it should return a 403 if the x-access-token is missing', (done) => {
      chai.request(app)
        .get('/v1/secret')
        .end((err, res) => {
          expect(err).not.to.be.null;
          expect(res).to.have.status(403);
          done();
        });
    });
    it('it should return a 403 if the token is invalid', (done) => {
      chai.request(app)
        .get('/v1/secret')
        .set('x-access-token', 'faketoken')
        .end((err, res) => {
          expect(err).not.to.be.null;
          expect(res).to.have.status(403);
          done();
        });
    });
    it('it should return an interesting secret if the token is valid', (done) => {
      chai.request(app)
        .get('/v1/secret')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message').that.is.a.string;
          done();
        });
    });


  });
});
