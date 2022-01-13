'use strict';
const _ = require('lodash');

const contactsRepository = require('./contacts.repository');

class ContactsService {
  async getAllContacts({ sort = 'asc', offset = 0, limit = 20 } = {}) {
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

  async createContact(payload) {
    if (_.isEmpty(payload.name)) {
      throw new Error('name is required');
    }

    return contactsRepository.create(payload);
  }

  async getContactById(contactId) {
    return contactsRepository.getById(contactId);
  }

  async updateContactById(contactId, payload) {
    if (_.isEmpty(payload.name)) {
      throw new Error('name is required');
    }

    return contactsRepository.updateById(contactId, payload);
  }
}

module.exports = new ContactsService();
