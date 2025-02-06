//import { Router, Request, Response, NextFunction } from 'express';
const User = require('../models/user.model');
const environmentConfig = require('../constants/environment.constant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthFailureError, NotFoundError, BadRequestError, InternalError } = require('../utils/error.handler');
const { SuccessResponse } = require('../utils/successResponse.handler');

//console.log('AuthService file');
class AuthService {
  static async login(req, res, next) {
    try {
      //console.log(BadRequestError);
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequestError('400', 'validation failed');
      }

      const users = await User.findOne({ where: { email: email } });
      //console.log(users);
      if (users === null) {
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
      // eslint-disable-next-line no-unused-vars
      next(error);

      // console.log(` name:${error.name} \n data: ${error.data} \n stack:${error.stack}`);
      // return res.status(Number(error.code)).json({ msg: error.message });
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password, role } = req.body;

      const users = await User.findOne({ where: { email } });
      //console.log(users);
      if (users) {
        //console.log("e1");
        //console.log(NotFoundError);
        throw new NotFoundError('404', 'User already exist..!');
      } else {
        //console.log("s1");
        const hashPassword = await bcrypt.hashSync(password, 12);
        const newuser = await User.create({
          email,
          password: hashPassword,
          role,
        });
        //console.log(newuser);
        //console.log(SuccessResponse);

        if (!newuser) {
          throw new InternalError('500', 'Internal Error');
        } else {
          return res.status(200).json(new SuccessResponse(true, 'New user registered successfully', 200));
        }
      }
    } catch (error) {
      next(error);

      // return res
      //   .status(error.code)
      //   .json({ msg: error.message, name: error.name, data: error.data, stack: error.stack });
    }
  }
}
//console.log(BadRequestError);
//console.log('AuthService2');
module.exports = { AuthService };
