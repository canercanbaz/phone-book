'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    work: String,
    home: String,
    mobile: String,
    other: String
  },
  emailAddress: String,
  mailingAddress: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
