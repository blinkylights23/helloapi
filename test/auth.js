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
describe('JWT Auth', () => {
  var user;
  beforeEach(() => {
    user = config.get('users').find(u => u.username == 'test');
  });

  describe('POST /auth', () => {
    it('it should respond with a 406 NOT ACCEPTABLE error when the req isn\'t JSON' , (done) => {
      chai.request(app)
        .post('/auth')
        .field('username', user.username)
        .field('password', user.password)
        .end((err, res) => {
          expect(err).not.to.be.null;
          expect(res).to.have.status(406);
          done();
        });
    });
    it('it should respond with an error when there\'s no matching username' , (done) => {
      chai.request(app)
        .post('/auth')
        .send({ username: 'NotRealUser', password: user.password })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('success').that.is.false;
          expect(res.body).not.to.have.property('token');
          done();
        });
    });
    it('it should respond with an error when the password is wrong' , (done) => {
      chai.request(app)
        .post('/auth')
        .send({ username: user.username, password: 'nottherightpassword' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('success').that.is.false;
          expect(res.body).to.have.property('username').that.equals(user.username);
          expect(res.body).not.to.have.property('token');
          done();
        });
    });
    it('it should respond successfully with JSON containing a JWT token', (done) => {
      chai.request(app)
        .post('/auth')
        .send({ username: user.username, password: user.password })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('success').that.is.true;
          expect(res.body.token).to.be.a.jwt;
          expect(res.body.token).to.be.signedWith(config.get('secret'));
          done();
        });
    });
  });
});
