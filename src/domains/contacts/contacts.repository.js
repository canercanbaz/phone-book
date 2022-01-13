'use strict';

const Contacts = require('./contacts.model');

class ContactsRepository {
  async getAll(sort, offset, limit) {
    return Contacts.find({}).skip(offset).limit(limit).sort({ _id: sort }).lean();
  }
}

module.exports = new ContactsRepository();
