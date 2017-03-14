'use strict';

const db = {
  DATABASE: {
    // Host is 'db' b/c docker-compose network
    uri: 'mongodb://db/test'
  }
};

module.exports = db;
