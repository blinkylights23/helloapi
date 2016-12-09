'use strict';

var jwt = require('jsonwebtoken'),
    config = require('config');

module.exports = function jwtAuth(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.get('secret'), function(err, decoded) {      
      if (err) {
        return res.status(403).json({
          success: false,
          err: 'Failed to verify token'
        });    
      } else {
        req.jwtData = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'A token is required' 
    });
  }
}
