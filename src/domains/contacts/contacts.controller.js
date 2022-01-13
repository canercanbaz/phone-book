'use strict';

const contactService = require('./contacts.service');
const response = require('../../utils/response');

class ContactsController {
  async getAllContacts(_, res) {
    const contacts = await contactService.getAllContacts();
    response.success(res, contacts);
  }
}

module.exports = new ContactsController();
