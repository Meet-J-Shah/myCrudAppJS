const path = require('path');
// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require('sequelize');
const environmentConfig = require('../constants/environment.constant');
const env = environmentConfig.NODE_ENV;

const config = require(
  path.join(
    // eslint-disable-next-line no-undef
    __dirname + '../../../' + 'config/config.json',
  ),
)[env];

const sequelize = new Sequelize(config);

module.exports = { Sequelize, sequelize };
