'use strict';

const contactService = require('./contacts.service');
const response = require('../../utils/response');

class ContactsController {
  async getAllContacts(req, res) {
    try {
      const { query } = req;
      const { sort, offset, limit } = query;
      const contacts = await contactService.getAllContacts({ sort, offset, limit });
      response.success(res, contacts);
    } catch (error) {
      return response.serverError(res, { msg: error.message });
    }
  }

  async createContact(req, res) {
    try {
      const payload = req.body;
      const contact = await contactService.createContact(payload);
      response.success(res, contact);
    } catch (error) {
      return response.serverError(res, { msg: error.message });
    }
  }

  async getContactById(req, res) {
    try {
      const { contactId } = req.params;
      const contact = await contactService.getContactById(contactId);
      response.success(res, contact);
    } catch (error) {
      return response.serverError(res, { msg: error.message });
    }
  }

  async updateContactById(req, res) {
    try {
      const { body, params } = req;
      const contact = await contactService.updateContactById(params.contactId, body);
      response.success(res, contact);
    } catch (error) {
      return response.serverError(res, { msg: error.message });
    }
  }

  async deleteContactById(req, res) {
    try {
      const { params } = req;
      const contact = await contactService.deleteContactById(params.contactId);
      response.success(res, contact);
    } catch (error) {
      return response.serverError(res, { msg: error.message });
    }
  }
}

module.exports = new ContactsController();
