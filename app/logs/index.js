'use strict';

var winston = require('winston'),
    config = require('../conf');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true, timestamp: true })
  ]
});

module.exports = logger;
