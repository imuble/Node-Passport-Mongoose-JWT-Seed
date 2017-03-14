'use strict';

// See Dockerfile for location of self-signed cert.
module.exports = {
  SSL: {
    PRIVATE_KEY: '/certs/cert.key',
    CERT: '/certs/cert.crt'
  }
};
