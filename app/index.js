'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    morgan = require('morgan'),
    swaggerRoutes = require('swagger-routes');


// The Express app
var app = express();
app.use(express.static(`${__dirname}/static`));
app.set('secret', config.get('secret'));

// Middleware
app.use(morgan(config.get('morganLogs')));
swaggerRoutes(app, {
  api: `${__dirname}/swagger/test.yaml`,
  docsPath: '/api-docs',
  handlers: `${__dirname}/handlers`,
  authorizers: `${__dirname}/security`,
  maintainHeaders: false
});

// Routers
// var routes = require('./routes');
// app.use('/', routes.normal);
// app.use('/api', routes.api);

// Listen
app.listen(config.get('port'), () => {
  console.log(`Express server started on port ${config.get('port')}`);
});

