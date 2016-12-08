'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./conf'),
    logger = require('./logs'),
    path = require('path'),
    expressWinston = require('express-winston'),
    swaggerMiddleware = require('swagger-express-middleware');


var users = [
  { username: 'paul', password: 'foo' },
  { username: 'manfred', password: 'bar' }
];


var app = express();
app.set('secret', config.get('secret'));

app.use(expressWinston.logger({
  winstonInstance: logger,
  level: 'info'
}));
app.use(bodyParser.json());

var normalRouter = express.Router(),
    apiRouter = express.Router();

normalRouter.get('/users', (req, res, next) => {
  res.json(users);
});
normalRouter.post('/auth', (req, res, next) => {
  var user = users.find((u) => { return u.username == req.body.username });
  if (!user) {
    res.json({ success: false, message: 'Authentication failed. User not found.' });
  } else {
    if (user.password != req.body.password) {
      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    } else {
      var token = jwt.sign(user, app.get('secret'), {
        // expiresInMinutes: 1440
      });
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }
  }
});




app.use('/normal', normalRouter);
app.use('/api', apiRouter);


swaggerMiddleware(path.join(__dirname, 'swagger/helloApi.yaml'), apiRouter, (err, mw) => {

  app.use(
    mw.metadata(),
    mw.CORS(),
    mw.files(),
    mw.parseRequest(),
    mw.validateRequest(),
    mw.mock()
  );

  apiRouter.get('/', (req, res) => { res.json({ msg: 'Should appear on /api' }) });

  app.listen(config.get('port'), () => {
    logger.info(`Listening on ${config.get('port')}`);
  });

});




