'use strict';

const express = require('express');
const router = express.Router();
const contactsController = require('./contacts.controller');

router.get('/', contactsController.getAllContacts);

module.exports = router;
