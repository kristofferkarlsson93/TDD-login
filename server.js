'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8088;

app.use(bodyParser.json({extended: true}));
require('./app/routes/routes')(app);
const server = app.listen(port, () => {
  console.log('Running server');
});
module.exports = server;
module.exports.stop = () => server.close();