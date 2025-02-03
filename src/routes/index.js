const auth = require('./auth.routes');
const user = require('./user.routes');

const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send('Status Check');
});

router.use('/auth', auth);
router.use('/user', user);
module.exports = router;
