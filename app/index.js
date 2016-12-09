'use strict';

var express = require('express'),
    config = require('config'),
    morgan = require('morgan'),
    routes = require('./routes'),
    swaggerRoutes = require('swagger-routes');


// The Express app
var app = express();
app.use(express.static(`${__dirname}/static`));
app.set('secret', config.get('secret'));

// Middleware
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan(config.get('morganLogs')));
}
swaggerRoutes(app, {
  api: `${__dirname}/swagger/test.yaml`,
  docsPath: '/api-docs',
  handlers: `${__dirname}/handlers`,
  authorizers: `${__dirname}/auth`,
  maintainHeaders: false
});

// Routes
app.use('/', routes.api);
app.use('/auth', routes.auth);

// Listen
app.listen(config.get('port'), () => {
  console.log(`Express server started on port ${config.get('port')}`);
});

// This, for testing
module.exports = app;
