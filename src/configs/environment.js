'use strict';

const dotenv = require('dotenv');

exports.loadEnv = () => {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env' });
  } else if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
  } else {
    dotenv.config({ path: '.env.dev' });
  }
};
