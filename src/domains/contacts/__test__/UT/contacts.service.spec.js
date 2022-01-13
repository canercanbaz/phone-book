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

  describe('createContact', function () {
    it('creates a new contact', async () => {
      const contact = await contactsService.createContact({ name: 'Test Contact 1', phone: '+901111111111' });
      expect(contact.name).toBeDefined();
      expect(contact.name).toEqual('Test Contact 1');
    });

    it('throws an error if name is not provided', async () => {
      try {
        await contactsService.createContact({ phone: '+901111111111' });
      } catch (error) {
        expect(error.name).toMatch('Error');
      }
    });
  });

  describe('getContactById', function () {
    it('returns a contact by id', async () => {
      const newContact = await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });

      const contact = await contactsService.getContactById(newContact._id);
      expect(contact.name).toBeDefined();
      expect(contact.name).toEqual('Test Contact 1');
    });

    it('throws an error if contact is not found', async () => {
      try {
        await contactsService.getContactById("61e068579a5f74ff3d265dc5"); // not found in db
      } catch (error) {
        expect(error.name).toMatch('Error');
      }
    });
  });

  describe('updateContactById', function () {
    it('updates a contact by id', async () => {
      const newContact = await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });

      const contact = await contactsService.updateContactById(newContact._id, {
        name: 'Test Contact 2'
      });
      expect(contact.name).toBeDefined();
      expect(contact.name).toEqual('Test Contact 2');
    });

    it('throws an error if contact is not found', async () => {
      try {
        await contactsService.updateContactById("61e068579a5f74ff3d265dc5", {
          name: 'Test Contact 2'
        });
      } catch (error) {
        expect(error.name).toMatch('Error');
      }
    });
  });

  describe('deleteContactById', function () {
    it('deletes a contact by id', async () => {
      const newContact = await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });

      const contact = await contactsService.deleteContactById(newContact._id);
      expect(contact.name).toBeDefined();
      expect(contact.name).toEqual('Test Contact 1');
    });

    it('throws an error if contact is not found', async () => {
      try {
        await contactsService.deleteContactById("61e068579a5f74ff3d265dc5");
      } catch (error) {
        expect(error.name).toMatch('Error');
      }
    });
  });
});
