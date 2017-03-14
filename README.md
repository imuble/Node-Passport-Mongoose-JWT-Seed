# Node-Passport-Mongoose-JWT-Seed
A simple node webserver using express. The seed has a register and login function already implemented using passport-local strategy.


# Development
Install docker and docker-compose on your system, then from the root of this project run
`docker-compose up`
This will build a development environment with a self-signed SSL cert.

The seed is also runnable after running "npm install" by running "node server/server.js" in the command line, but that is not recommended.


# Create a user
TODO - document how to create a user in the system, and log in.


# JSON Web Tokens - JWT
Tokens are provided either by processing a valid email/password combination or by providing a valid refresh token (which is provided alongside the access-token). The access-token can then be in the "Authorization" header on API requests that require validation, given that the request use the validation middleware.
