'use strict';

const mongoose = require('mongoose');

class MongoDBClient {
  async connect() {
    if (this.client) {
      return this.client;
    }

    const client = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    mongoose.connection.on('error', error => {
      console.error(error);
    });

    this.client = client;
    return this.client;
  }

  async disconnect() {
    await this.client.disconnect();
  }
}

module.exports = new MongoDBClient();
