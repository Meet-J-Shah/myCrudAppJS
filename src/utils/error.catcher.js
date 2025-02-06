const { isCelebrateError } = require('celebrate');
const CONSTANTS = require('../constants/constant');
const { BaseError } = require('../utils');

// eslint-disable-next-line no-unused-vars
const errorCatcher = (err, req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  //console.log('Error caught in errorCatcher middleware:', err); // Log the error
  console.log(err.stack); // Log the error stack

  // Handle validation errors from Celebrate (Joi)
  if (isCelebrateError(err)) {
    let errorMessage = CONSTANTS.ERROR_MESSAGES.VALIDATION_ERROR;

    for (const [, joiError] of err.details.entries()) {
      errorMessage = joiError.details.map((detail) => detail.message).join(', ');
    }

    return res.status(CONSTANTS.RESPONSE_CODES.BAD_REQUEST).json({
      error: CONSTANTS.ERROR_MESSAGES.VALIDATION_ERROR,
      message: errorMessage,
    });
  }

  // Handle custom errors (e.g., BadRequestError, NotFoundError)
  if (err instanceof BaseError) {
    return res.status(err.code || CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      error: err.name,
      message: err.message,
    });
  }

  // Default internal server error
  return res.status(CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
    error: CONSTANTS.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
    message: CONSTANTS.ERROR_MESSAGES.SERVER_ERROR,
  });
};

module.exports = errorCatcher;
