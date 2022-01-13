'use strict';

const contactsRepository = require('./contacts.repository');

class ContactsService {
  async getAllContacts() {
    return contactsRepository.getAllContacts();
  }
}

module.exports = new ContactsService();
