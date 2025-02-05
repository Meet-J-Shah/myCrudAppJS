/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { celebrate, Joi, errors, Segments } = require('celebrate');
var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
// let s1 = "Geeks@123";

// console.log(s1, regex.test(s1));
// console.log('auth validator');
const SigninSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(new RegExp(regex)).messages({
      'string.base': `Password should be a type of string`,
      'string.empty': `Password must contain value`,
      'string.pattern.base': `Password must have Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character:`,
      'any.required': `Password is a required field`,
    }),
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
