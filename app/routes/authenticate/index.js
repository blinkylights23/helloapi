'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    route = express.Router();

route.use(bodyParser.json())
  .post('/', (req, res, next) => {
    if (!req.is('json')) {
      res.status(406).json({ httpStatus: 406, result: 'Not acceptable' });
    }

    let err, token;
    let success = false;
    let username = 'Not found';
    let result = { success, username, err, token };

    let user = config.get('users').find(u => u.username == req.body.username);
    if (!user) {
      result.err = 'User not found';
      res.json(result);
    }
    result.username = user.username;
    if (user.password != req.body.password) {
      result.err = 'Login incorrect'; 
      res.json(result);
    } else {
      result.success = true;
      result.token = jwt.sign(user, config.get('secret'), {
        expiresIn: '1h'
      });
    }
    res.json(result);
  })
  .get('/', (req, res) => {
    res.json({ 'message': 'Authenticate' });
  });

module.exports = route;
