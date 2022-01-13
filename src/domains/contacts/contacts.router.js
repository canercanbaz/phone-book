'use strict';

const express = require('express');
const router = express.Router();
const contactsController = require('./contacts.controller');

router.get('/', contactsController.getAllContacts);
router.post('/', contactsController.createContact);
router.get('/:contactId', contactsController.getContactById);
router.put('/:contactId', contactsController.updateContactById);

module.exports = router;
