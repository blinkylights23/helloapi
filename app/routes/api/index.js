'use strict';

var express = require('express');
var route = express.Router();

route.get('/', (req, res) => {
  res.json({ 'message': 'API' });
});

module.exports = route;
