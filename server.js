'use strict';

const app = require('./src/app');

const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development'

app.listen(port, () => {
  console.log(`Server is ready on port ${port} in ${environment}`);
});
