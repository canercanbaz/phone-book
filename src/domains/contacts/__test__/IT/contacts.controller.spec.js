const request = require('supertest');

const app = require('../../../../app');
const Contact = require('../../contacts.model');
const mongoClient = require('../../../../database/mongodb.client');

const TIMEOUT = 10 * 1000; // 10 seconds

describe('Contacts Controller', function () {
  afterAll(async () => {
    await mongoClient.disconnect();
  });

  beforeEach(async () => {
    await Contact.deleteMany();
  });

  describe('GET /api/contacts', function () {
    it('returns the list of contacts', async () => {
      await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });

      const response = await request(app)
        .get('/api/contacts')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      const { body: contacts } = response;

      expect(contacts.length).toBeGreaterThan(0);
      expect(contacts[0].name).toBeDefined();
      expect(contacts[0].name).toEqual('Test Contact 1');
    }, TIMEOUT);

    it('returns empty list if no contacts exist', async () => {
      const response = await request(app)
        .get('/api/contacts')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      const { body: contacts } = response;
      expect(contacts.length).toBe(0);
    }, TIMEOUT);

    it('returns the list of contacts by limit provided', async () => {
      await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });
      await Contact.create({ name: 'Test Contact 2', phone: '+902222222222' });

      const responseWithoutLimit = await request(app)
        .get('/api/contacts')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      expect(responseWithoutLimit.body.length).toBe(2);

      const responseByLimit = await request(app)
        .get('/api/contacts?limit=1')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      const { body: contactsByLimit } = responseByLimit;

      expect(contactsByLimit.length).toBe(1);
      expect(contactsByLimit[0].name).toBeDefined();
    }, TIMEOUT);

    it('returns the list of contacts by offset provided', async () => {
      await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });
      await Contact.create({ name: 'Test Contact 2', phone: '+902222222222' });

      const responseWithoutOffset = await request(app)
        .get('/api/contacts')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      expect(responseWithoutOffset.body.length).toBe(2);

      const responseByOffset = await request(app)
        .get('/api/contacts?offset=1')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      const { body: contactsByOffset } = responseByOffset;

      expect(contactsByOffset.length).toBe(1);
      expect(contactsByOffset[0].name).toEqual('Test Contact 2');
    }, TIMEOUT);

    it('returns the list of contacts by sort provided', async () => {
      await Contact.create({ name: 'Test Contact 1', phone: '+901111111111' });
      await Contact.create({ name: 'Test Contact 2', phone: '+902222222222' });

      const responseWithoutSort = await request(app)
        .get('/api/contacts')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      expect(responseWithoutSort.body.length).toBe(2);

      const responseBySortAscending = await request(app)
        .get('/api/contacts?sort=asc')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      expect(responseBySortAscending.body[0].name).toEqual('Test Contact 1');

      const responseBySortDescending = await request(app)
        .get('/api/contacts?sort=desc')
        .set('Accept', 'application/json')
        .expect('Content-Type', new RegExp('json'));

      expect(responseBySortDescending.body[0].name).toEqual('Test Contact 2');
    }, TIMEOUT);
  });
});