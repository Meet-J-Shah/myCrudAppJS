/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { celebrate, Joi, errors, Segments } = require('celebrate');
var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
const CONSTANTS = require('../constants/constant');
// let s1 = "Geeks@123";

// console.log(s1, regex.test(s1));
// console.log('auth validator');
const SigninSchema = {
  body: {
    email: Joi.string().email().required().messages(CONSTANTS.VALIDATION_MESSAGES.VALIDATE_EMAIL),
    password: Joi.string().required().pattern(new RegExp(regex)).messages(CONSTANTS.VALIDATION_MESSAGES.VALIDTAE_PWD),
  },
};

const SignupSchema = {
  body: {
    email: Joi.string().email().required().messages(CONSTANTS.VALIDATION_MESSAGES.VALIDATE_EMAIL),
    password: Joi.string().required().pattern(new RegExp(regex)).messages(CONSTANTS.VALIDATION_MESSAGES.VALIDTAE_PWD),
    role: Joi.string().required().valid('admin', 'user').messages(CONSTANTS.VALIDATION_MESSAGES.VALIDATE_ROLE),
  },
};

const validateId = {
  [Segments.PARAMS]: {
    id: Joi.number().min(1).max(100).required().messages(CONSTANTS.VALIDATION_MESSAGES.VALIDATE_ID),
  },
};

const UpdateSchema = {
  body: {
    email: Joi.string().email().required().messages(CONSTANTS.VALIDATION_MESSAGES.VALIDATE_EMAIL),
    password: Joi.string().required().pattern(new RegExp(regex)).messages(CONSTANTS.VALIDATION_MESSAGES.VALIDTAE_PWD),
  },
};

module.exports = {
  SignupSchema,
  SigninSchema,
  validateId,
  UpdateSchema,
};
