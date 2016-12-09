'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app'),
    expect = chai.expect;

chai.use(chaiHttp);

// A non-authenticated route
describe('Hello', () => {
  describe('GET /hello', () => {
    it('it should respond successfully with JSON containing a nice greeting', (done) => {
      chai.request(app)
        .get('/v1/hello')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message')
            .that.is.a('string')
            .that.equals('Hello!');
          done();
        });
    });
  });
});
