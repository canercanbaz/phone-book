'use strict';

const express = require('express');
const { loadEnv } = require('./configs/environment');
loadEnv();
const mongoClient = require('./database/mongodb.client');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load routes
require('./routes')(app);

async function main() {
  try {
    await mongoClient.connect();
    console.log("Successfully connected to the MongoDB");
  } catch (error) {
    console.error(error);
  }
}

main();

module.exports = app;
