'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const dbConfig = require('./config/db.config');
const serverConfig = require('./config/server.config');
const sslConfig = require('./config/ssl.config');

const privateKey = fs.readFileSync(sslConfig.SSL.PRIVATE_KEY);
const certificate = fs.readFileSync(sslConfig.SSL.CERT);

let mongoptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } } };
mongoose.connect(dbConfig.DATABASE.uri, mongoptions);
let conn = mongoose.connection;
conn.on('error', function(e) { console.error(`Error connecting to ${dbConfig.DATABASE.uri}.`, e); });
conn.once('open', function() { console.log(`Connected to ${dbConfig.DATABASE.uri}`); });

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', router());

let httpsConf = {
  key: privateKey,
  cert: certificate
};

// Redirect from http to https
http.createServer(function (req, res) {
  let host = req.headers.host.split(":").shift(); //grab domain without port
  let url = "https://" + host + ':' + serverConfig.PORT_HTTPS + req.url;
  res.writeHead(301, {"Location": url});
  res.end();
}).listen(serverConfig.PORT_HTTP);
console.log('HTTP server listening on port ' + serverConfig.PORT_HTTP + ' and redirecting to https.');

// Primary server listen
https.createServer(httpsConf, app).listen(serverConfig.PORT_HTTPS);
console.log('HTTPS server listening on port ' + serverConfig.PORT_HTTPS);
