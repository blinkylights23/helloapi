'use strict';

var nconf = require('nconf');


// Only pull in these vars from env
var envVars = [
  '_',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'NODE_ENV'
];

var Config = function() {
  var environment = process.env['NODE_ENV'] || 'dev',
      envConf = `${__dirname}/${environment.toLowerCase()}.json`,
      defaultConf = __dirname + '/default.json';
  nconf.argv()
    .env(envVars)
    .file(environment, envConf)
    .file('default', defaultConf);
  console.log(`Configuration loaded for ${environment} environment`);
};

Config.prototype.get = function(key) {
  return nconf.get(key);
};


module.exports = new Config();
