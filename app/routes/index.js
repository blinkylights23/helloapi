'use strict';

var apiRoutes = require('./api'),
    authRoutes = require('./authenticate');

module.exports = {
  api: apiRoutes,
  auth: authRoutes
};