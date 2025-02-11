//import { Router, Request, Response, NextFunction } from 'express';
const User = require('../models/user.model');
const environmentConfig = require('../constants/environment.constant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants/constant');
const { AuthFailureError, NotFoundError, BadRequestError, InternalError } = require('../utils/error.handler');
const { SuccessResponse } = require('../utils/successResponse.handler');

//console.log('AuthService file');
class AuthService {
  static async login(req, res, next) {
    try {
      //console.log(BadRequestError);
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequestError(
          CONSTANTS.RESPONSE_CODES.BAD_REQUEST,
          CONSTANTS.ERROR_MESSAGES.USER_ERRORS.FAILED_VALIDATION,
        );
      }

      const users = await User.findOne({ where: { email: email } });
      //console.log(users);
      if (users === null) {
        throw new NotFoundError(CONSTANTS.RESPONSE_CODES.UNAUTHORIZED, CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_FOUND);
      } else {
        const passwordMatched = bcrypt.compareSync(password, users.password);
        if (!passwordMatched) {
          throw new AuthFailureError(
            CONSTANTS.RESPONSE_CODES.UNAUTHORIZED,
            CONSTANTS.ERROR_MESSAGES.USER_ERRORS.PWD_NOT_MATCHED,
          );
        } else {
          const token = jwt.sign({ id: users.id, role: users.role }, environmentConfig.JWT_SECRET);
          const data = {
            email: users.email,
            role: users.role,
            token: 'Bearer ' + token,
          };
          return res
            .status(CONSTANTS.RESPONSE_CODES.SUCCESS)
            .json(
              new SuccessResponse(
                true,
                CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.SIGN_SUCESS,
                CONSTANTS.RESPONSE_CODES.SUCCESS,
                data,
              ),
            );
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
        throw new NotFoundError(CONSTANTS.RESPONSE_CODES.EXISTS, CONSTANTS.ERROR_MESSAGES.USER_ERRORS.USER_EXISTS);
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
          throw new InternalError(
            CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            CONSTANTS.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
          );
        } else {
          return res
            .status(CONSTANTS.RESPONSE_CODES.SUCCESS)
            .json(
              new SuccessResponse(
                true,
                CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.REGISTER_SUCESS,
                CONSTANTS.RESPONSE_CODES.SUCCESS,
              ),
            );
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
