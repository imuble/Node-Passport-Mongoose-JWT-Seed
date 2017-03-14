'use strict';

const server = {
  PORT_HTTP: 8080,
  PORT_HTTPS: 8443,
  SECRET: 'SECRET_COMES_HERE',
  TOKEN: {
    EXPIRATION_TIME: 60 * 60 // in seconds.
  }
};

module.exports = server;
