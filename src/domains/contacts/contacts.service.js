'use strict';

const contactsRepository = require('./contacts.repository');

class ContactsService {
  async getAllContacts(sort = 'asc', offset = 0, limit = 20) {
    if (sort && sort !== 'asc' && sort !== 'desc') {
      throw new Error('sort parameter should be either `asc` or `desc`');
    }

    if (offset && Number.isNaN(Number(offset)) || (Number(offset) < 0)) {
      throw new Error('offset parameter should be a non-negative number');
    }

    if (limit && Number.isNaN(Number(limit)) || (Number(limit) <= 0)) {
      throw new Error('limit parameter should be a positive number');
    }

    return contactsRepository.getAll(sort, offset, limit);
  }
}

module.exports = new ContactsService();
