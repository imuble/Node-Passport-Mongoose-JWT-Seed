# Node-Passport-Mongoose-JWT-Seed
A simple node webserver using express. The seed has a register and login function already implemented using passport-local strategy.

# Usage

The seed is runnable after running "npm install" by running "gulp" in the command line. Tokens are provided either by processing a valid username/password combination or by providing a valid refresh token (which is provided alongside the access-token). The access-token can then be in the "Authorization" header on API requests that require validation, given that the request use the validation middleware.
