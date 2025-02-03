const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve('../myCrudAppJS/.env'),
});
// eslint-disable-next-line no-undef
console.log(process.env.PORT);
const environmentConfig = Object.freeze({
  // eslint-disable-next-line no-undef
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  // eslint-disable-next-line no-undef
  PORT: process.env.PORT ? process.env.PORT : 3001,
  // eslint-disable-next-line no-undef
  JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret123',
});

module.exports = environmentConfig;
