/**
 * Get a nice greeting
 *
 * GET: /v1/hello
 * 
 */
exports.handler = function hello(req, res, next) {
  res.json({
    message: 'Hello!'
  });
  next()
}
