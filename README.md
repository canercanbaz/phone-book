# Phone Book - Built in Node.js

### Description

This project enables you to achieve CRUD operations on a phone book

### Environment Variables

You should create a `.env` files to customize the environment variables for the web api.  
For the production, a file named `.env` needs to be created.  
For the development, a file named `.env.dev` needs to be created.  
For the tests, a file named `.env.test` needs to be created.  
Sample environment file is below:

```bash
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/phone-book
```

### How to start?

1. Install npm modules by runnning: `npm install` in the root folder.
2. Start the MongoDB server, and set `MONGODB_URI` in environment variables.
3. Run the server according to the environment.

- Production: `npm run start`
- Development: `npm run start:dev`

You can also start the server using docker-compose. In the root folder, run the following command to start the web service:

`docker-compose up -d`

The server will listen port `3000`.

### Endpoints

- Get all contacts `/api/contacts` (GET)
- Create a new contact `/api/contacts` (POST)
- Get a contact by id `/api/contacts/:contactId` (GET)
- Update a contact by id `/api/contacts/:contactId` (PUT)
- Delete a contact by id `/api/contacts/:contactId` (DELETE)

You can find the sample requests in the [Postman collection](phone-book.postman_collection.json) placed in the root folder of the project.

### How to run tests?

You can run `npm test` command to start testing.  
Do not forget to create `.env.test` file for tests to run properly.
