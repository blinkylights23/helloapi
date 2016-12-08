'use strict';

var normalRoutes = require('./normal'),
    apiRoutes = require('./api');

module.exports = {
  normal: normalRoutes,
  api: apiRoutes
};