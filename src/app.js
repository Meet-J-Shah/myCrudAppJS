const express = require('express');
//const errorHandler=require('./utils/error.handler')
const dotenv = require('dotenv');
dotenv.config();

// Importing routes
const routes = require('./routes');

// Importing database models
const db = require('./models');
//console.log('db:', db);
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

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//app.use(errorHandler);

app.listen(environmentConfig.PORT, async () => {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await db.sequelize.sync({ force: false });
  console.log(`Server running on ${environmentConfig.PORT}`);
});

module.exports = app;
