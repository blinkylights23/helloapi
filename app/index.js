'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    morgan = require('morgan'),
    path = require('path');


// The Express app
var app = express();
app.set('secret', config.get('secret'));

// Middleware
app.use(morgan(config.get('morganLogs')));

// Routers
var routes = require('./routes');
app.use('/', routes.normal);
app.use('/api', routes.api);

// Listen
app.listen(config.get('port'), () => {
  console.log(`Express server started on port ${config.get('port')}`);
});

