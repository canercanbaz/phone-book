'use strict';

class ContactsRepository {
  async getAllContacts() {
    return [{
      name: 'Caner',
      phoneNumber: '+901111111111',
      email: 'canercanbazz@gmail.com',
      address: 'Turkey'
    }];
  }
}

module.exports = new ContactsRepository();
