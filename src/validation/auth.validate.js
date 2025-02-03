/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { celebrate, Joi, errors, Segments } = require('celebrate');
console.log('auth validator');
const SigninSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

const SignupSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
  },
};

module.exports = {
  SignupSchema,
  SigninSchema,
};
