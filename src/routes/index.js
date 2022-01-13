'use strict';

const response = require('../utils/response');
const contactsRouter = require('../domains/contacts/contacts.router');

module.exports = (app) => {
  app.use('/api/contacts', contactsRouter);

  // 404 not found route - Keep this as the last route!
  app.get('*', (_, res) => {
    response.notFoundError(res, { msg: 'Not found' });
  });
};
