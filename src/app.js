'use strict';

const express = require('express');
const { loadEnv } = require('./configs/environment');
loadEnv();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load routes
require('./routes')(app);

module.exports = app;
