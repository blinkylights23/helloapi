# Hello API

### What the heck is this?

This is a simple Express-based REST API that I've built to serve as a reference implementation, a potential starting place for a nice Yeoman generator (we'll see), and really just a good exercise in exploring what the current tools are for building a simple (or maybe even not-so-simple) API.

The goals here are:

- Express-based API
- Not too many dependencies
- Swagger spec and documentation (but not `swagger-node`)
- JWT authentication
- Use `morgan` for logging instead of `winston`
- Use `config` for configuration instead of `nconf`
- Endpoints should have tests
- No build, hosting or deployment opinions

