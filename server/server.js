'use strict';

const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/db.config');

if (mongoose.connection.readyState === 0) {
  mongoose.connect(dbConfig.DATABASE.test, function (err) {
    if (err) console.log(err);
    else console.log('Successfully connected to: ' + dbConfig.DATABASE.test);
  });
}

// app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.use('/api', router());

var port = 8080;
app.listen(port, function () {
  console.log('Server is now listening at port ' + port);
});
