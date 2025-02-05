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
//const CONSTANTS = require('./constants/constant');
const app = express();

//setting middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// console.log(CONSTANTS.RESPONSE_MESSAGES.SUCCESS); // Output: "Success"
// console.log(CONSTANTS.RESPONSE_MESSAGES.NOT_FOUND); // Output: "Not Found"

app.use(routes);

// const errorHandler = (err, req, res, next) => {
//   if (isCelebrateError(err)) {
//       let errorMessage = 'Validation error';

//       for (const [, joiError] of err.details.entries()) {
//           errorMessage = joiError.details.map(detail => detail.message).join(', ');
//       }

//       return res.status(400).json({ error: errorMessage });
//   }
//   next();
//   //return res.status(500).json({ error: 'Internal Server Error' });
// };

//app.use(errors());

app.use(errorCatcher);
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  // ✅ Add next parameter
  console.log(err.stack);

  // Check if the error is an instance of BaseError (custom error)
  /* eslint-disable no-undef */
  if (err instanceof BaseError) {
    return res.status(err.code || 500).json({
      error: err.name,
      message: err.message,
      data: err.data,
    });
  }
  /* eslint-enable no-undef */

  // Default response for unhandled errors
  return res.status(500).send('Something broke!');
});
/* eslint-enable no-unused-vars */

//app.use(errorHandler);

app.listen(environmentConfig.PORT, async () => {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await db.sequelize.sync({ force: false });
  console.log(`Server running on ${environmentConfig.PORT}`);
});

module.exports = app;
