'use strict';

const contactService = require('./contacts.service');
const response = require('../../utils/response');

class ContactsController {
  async getAllContacts(req, res) {
    try {
      const { query } = req;
      const { sort, offset, limit } = query;     
      const contacts = await contactService.getAllContacts(sort, offset, limit);
      response.success(res, contacts);
    } catch (error) {
      return response.serverError(res, { msg: error.message });
    }
  }
}

module.exports = new ContactsController();
