const jwt = require('jsonwebtoken');
const environmentConfig = require('../constants/environment.constant');
const User = require('../models/user.model');
const { AuthFailureError } = require('../utils/error.handler');

const verifyToken = () => {
  return 'Token verified';
};

const verifyUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AuthFailureError('401', 'Invalid Token..!');
    }

    const scheme = authorization.split(' ')[0];
    if (scheme !== 'Bearer') {
      throw new AuthFailureError('401', 'Invalid Token..!');
    }
    const token = authorization.split(' ')[1];
    console.log('Token:', token);
    jwt.verify(token, environmentConfig.JWT_SECRET, async (err, payload) => {
      if (err) {
        throw new AuthFailureError('401', 'Inavalid username or password..!');
      }
      const { id } = payload;
      const user = await User.findOne({ where: { id } });
      if (user) {
        req.user = user;
        next();
      } else {
        throw new AuthFailureError('401', 'User not found..!');
      }
    });
  } catch (error) {
    console.log(` name:${error.name} \n data: ${error.data} \n stack:${error.stack}`);
    return res.status(error.code).json({ msg: error.message });
  }
};

const verifyAdmin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(400).json({ message: 'You have no permission..!', status: 400 });
  }
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
