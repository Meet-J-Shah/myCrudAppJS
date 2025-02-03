const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

// Importing routes
const routes = require('./routes');

// Importing database models
const db = require('./models');
const environmentConfig = require('./constants/environment.constant');
const helmet = require('helmet');
const morgan = require('morgan');
const { errors } = require('celebrate');

const app = express();

//setting middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(errors());

app.listen = async function listen() {
  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sequelize.sync({ force: false });
  this.app.listen(environmentConfig.PORT, () => {
    console.log(`Server running on ${environmentConfig.PORT}`);
  });
  //export app
};

module.exports = app;
