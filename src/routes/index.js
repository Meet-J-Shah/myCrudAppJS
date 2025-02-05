const auth = require('./auth.routes');
const user = require('./user.routes');
const admin = require('./admin.routes');
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send('Status Check');
});

router.use('/auth', auth);
router.use('/user', user);
router.use('/admin', admin);
module.exports = router;
