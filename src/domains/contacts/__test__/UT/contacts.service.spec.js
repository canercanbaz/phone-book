const contactsService = require('../../contacts.service');
const Contact = require('../../contacts.model');
const { loadEnv } = require('../../../../configs/environment');
const mongoClient = require('../../../../database/mongodb.client');

describe('Contacts Service', function () {
  beforeAll(async () => {
    loadEnv();
    await mongoClient.connect();
  });

  afterAll(async () => {
    await mongoClient.disconnect();
  });

  beforeEach(async () => {
    await Contact.deleteMany();
  });

  describe('getAllContacts', function () {
    it('returns all contacts', async () => {
      await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });

      const contacts = await contactsService.getAllContacts();
      expect(contacts.length).toBeGreaterThan(0);
      expect(contacts[0].name).toBeDefined();
      expect(contacts[0].name).toEqual('Test Contact 1');
    });

    it('returns contacts by limit provided', async () => {
      await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });
      await Contact.create({ name: 'Test Contact 2', phone: '+902222222222' });

      const contacts = await contactsService.getAllContacts();
      expect(contacts.length).toBe(2);

      const contactsByLimit = await contactsService.getAllContacts({ limit: 1 });
      expect(contactsByLimit.length).toBe(1);
      expect(contactsByLimit[0].name).toBeDefined();
    });

    it('returns contacts by offset provided', async () => {
      await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });
      await Contact.create({ name: 'Test Contact 2', phone: '+902222222222' });

      const contacts = await contactsService.getAllContacts();
      expect(contacts.length).toBe(2);

      const contactsByOffset = await contactsService.getAllContacts({ offset: 1 });
      expect(contactsByOffset.length).toBe(1);
      expect(contactsByOffset[0].name).toEqual('Test Contact 2');
    });

    it('returns contacts by sort provided', async () => {
      await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });
      await Contact.create({ name: 'Test Contact 2', phone: '+902222222222' });

      const contacts = await contactsService.getAllContacts();
      expect(contacts.length).toBe(2);

      const contactsBySortAscending = await contactsService.getAllContacts({ sort: 'asc' });
      expect(contactsBySortAscending[0].name).toEqual('Test Contact 1');

      const contactsBySortDescending = await contactsService.getAllContacts({ sort: 'desc' });
      expect(contactsBySortDescending[0].name).toEqual('Test Contact 2');
    });
  });
});