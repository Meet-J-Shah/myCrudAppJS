const { UserService } = require('../service');
const { Router } = require('express');
const router = Router({ mergeParams: true });
const { verifyUser } = require('../middleware');
//const { verifyUser, verifyAdmin }= require('../middleware');
//const authSchema = require('../validation/auth.validate');

//const { celebrate } = require('celebrate');
// console.log('UserListRepository:', UserListRepository);
router.get('/userlist', verifyUser, UserService.getUserList);

module.exports = router;
