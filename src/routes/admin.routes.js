// routes/userRoutes.js
const { Router } = require('express');
const { UserController } = require('../controllers'); // Import from the barrel file
const { verifyUser, verifyAdmin } = require('../middleware');
const authSchema = require('../validation/auth.validate');
const { celebrate } = require('celebrate');

const router = Router({ mergeParams: true });

//router.post('/users', UserController.createUser);
router.get('/users', verifyUser, verifyAdmin, UserController.getUserList);
router.get('/users/:id', verifyUser, verifyAdmin, celebrate(authSchema.validateId), UserController.getUserById);
router.put(
  '/users/:id',
  verifyUser,
  verifyAdmin,
  celebrate(authSchema.validateId),
  celebrate(authSchema.UpdateSchema),
  UserController.updateUser,
);
router.delete('/users/:id', verifyUser, verifyAdmin, celebrate(authSchema.validateId), UserController.deleteUser);

module.exports = router;
