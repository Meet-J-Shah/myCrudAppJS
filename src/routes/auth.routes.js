const { Router } = require('express');
const { LoginRepository, RegisterRepository } = require('../repositories/index.js');
const authSchema = require('../validation/auth.validate');
const { celebrate } = require('celebrate');

const router = Router({ mergeParams: true });

router.post('/login', celebrate(authSchema.SigninSchema), LoginRepository.login);
router.post('/register', celebrate(authSchema.SignupSchema), RegisterRepository.register);

module.exports = router;
