'use strict';

const path = require('path');
const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/db.config');
const serverConfig = require('./config/server.config');

if (mongoose.connection.readyState === 0) {
  mongoose.connect(dbConfig.DATABASE.test, function (err) {
    if (err) console.log(err);
    else console.log('Successfully connected to: ' + dbConfig.DATABASE.test);
  });
}

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.use('/api', router());

app.listen(serverConfig.PORT, function () {
  console.log('Server is now listening at port ' + serverConfig.PORT);
});
