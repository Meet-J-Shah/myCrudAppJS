//import { Router, Request, Response, NextFunction } from 'express';
const User = require('../models/user.model');
const environmentConfig = require('../constants/environment.constant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthFailureError, NotFoundError, BadRequestError, InternalError } = require('../utils/error.handler');
const { SuccessResponse } = require('../utils/successResponse.handler');

class AuthService {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequestError('400', 'validation failed');
      }

      const users = await User.findOne({ where: { email: email } });
      if (!users) {
        throw new NotFoundError('404', 'Not Found');
      } else {
        const passwordMatched = bcrypt.compareSync(password, users.password);
        if (!passwordMatched) {
          throw new AuthFailureError('401', 'Unauthorized');
        } else {
          const token = jwt.sign({ id: users.id, role: users.role }, environmentConfig.JWT_SECRET);
          const data = {
            email: users.email,
            role: users.role,
            token: 'Bearer ' + token,
          };
          return res.status(200).json(new SuccessResponse(true, 'Signin successfully', 200, data));
        }
      }
    } catch (error) {
      return error;
    }
  }
  static async register(req, res) {
    try {
      const { email, password, role } = req.body;

      const users = await User.findOne({ where: { email: email } });
      if (users) {
        throw new NotFoundError('404', 'User already exist..!');
      } else {
        const hashPassword = await bcrypt.hashSync(password, 12);
        const newuser = await User.create({
          email,
          password: hashPassword,
          role,
        });
        if (!newuser) {
          throw new InternalError('500', 'Internal Error');
        } else {
          return res.status(200).json(new SuccessResponse(true, 'New user registered successfully', 200));
        }
      }
    } catch (error) {
      return error;
    }
  }
}
console.log('AuthService');
module.exports = { AuthService };
