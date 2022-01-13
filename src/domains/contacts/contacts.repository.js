'use strict';
const _ = require('lodash');

const Contact = require('./contacts.model');

class ContactsRepository {
  async getAll(sort, offset, limit) {
    return Contact.find({}).skip(offset).limit(limit).sort({ _id: sort }).lean();
  }

  async create(payload) {
    const contact = await Contact.create(payload);
    return _.toPlainObject(contact);
  }
}

module.exports = new ContactsRepository();
