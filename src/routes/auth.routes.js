const { Router } = require('express');
// const { LoginRepository } = require('../repositories/index.js');
// const { RegisterRepository } = require('../repositories/index.js');
const { AuthService } = require('../service/index');
const authSchema = require('../validation/auth.validate');
const { celebrate } = require('celebrate');

// console.log('LoginRepository:', LoginRepository);
// console.log('RegisterRepository', RegisterRepository);

const router = Router({ mergeParams: true });

router.post('/login', celebrate(authSchema.SigninSchema), AuthService.login);
router.post('/register', celebrate(authSchema.SignupSchema), AuthService.register);

module.exports = router;
