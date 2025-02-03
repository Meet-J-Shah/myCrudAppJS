const { UserListRepository } = require('../repositories');
const { Router } = require('express');
const router = Router({ mergeParams: true });
const { verifyUser } = require('../middleware');
//const { verifyUser, verifyAdmin }= require('../middleware');
//const authSchema = require('../validation/auth.validate');

//const { celebrate } = require('celebrate');

router.get('/userlist', verifyUser, UserListRepository.getUserList);

module.exports = router;
