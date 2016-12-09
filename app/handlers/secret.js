/**
 * Learn a fascinating secret
 *
 * GET: /v1/secret
 * 
 */
exports.handler = function secret(req, res, next) {
  // req.jwtData contains the JWT stuff here
  res.json({
    message: 'The secret is that this was easy to do'
  });
  next();
}
