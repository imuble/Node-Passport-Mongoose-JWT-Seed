'use strict';

const server = {
  PORT: 3000,
  SECRET: 'SECRET_COMES_HERE',
  TOKEN: {
    EXPIRATION_TIME: 60 * 60 // in seconds.
  }
};

module.exports = server;
