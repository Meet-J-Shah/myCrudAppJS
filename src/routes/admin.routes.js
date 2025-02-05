// routes/userRoutes.js
const { Router } = require('express');
const { UserController } = require('../controllers'); // Import from the barrel file
const router = Router();

//router.post('/users', UserController.createUser);
router.get('/users', UserController.getUserList);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
