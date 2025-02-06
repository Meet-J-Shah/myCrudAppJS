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
//const { errors } = require('celebrate');
//const { isCelebrateError } = require('celebrate');
const errorCatcher = require('./utils/error.catcher');
const CONSTANTS = require('./constants/constant');
const app = express();

//setting middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use(errorCatcher);
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  // ✅ Add next parameter
  console.log(err.stack);

  // Check if the error is an instance of BaseError (custom error)
  /* eslint-disable no-undef */
  if (err instanceof BaseError) {
    return res.status(err.code || CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      error: err.name,
      message: err.message,
      data: err.data,
    });
  }
  /* eslint-enable no-undef */

  // Default response for unhandled errors
  return res.status(CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR).send(CONSTANTS.ERROR_MESSAGES.DEFAULT_ERROR);
});
/* eslint-enable no-unused-vars */

app.listen(environmentConfig.PORT, async () => {
  await db.sequelize.authenticate();
  console.log(CONSTANTS.LOG_MESSAGES.DB_CONNECTION);
  await db.sequelize.sync({ force: false });
  console.log(`Server running on ${environmentConfig.PORT}`);
});

module.exports = app;
