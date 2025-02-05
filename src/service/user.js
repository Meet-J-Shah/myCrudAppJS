// const { Router, Request, Response, NextFunction } =require('express');

const User = require('../models/user.model');
const { NotFoundError } = require('../utils/error.handler');
const { SuccessResponse } = require('../utils/successResponse.handler');

class UserService {
  static async getUserList(req, res, next) {
    try {
      const users = await User.findAll({ where: { role: 'user' }, attributes: ['id', 'email', 'role', 'createdAt'] });
      if (!users) {
        throw new NotFoundError('404', 'Not Found');
      } else {
        return res.status(200).json(new SuccessResponse(true, '', 200, users));
      }
    } catch (error) {
      // eslint-disable-next-line no-unused-vars
      next(error);
    }
  }
}

module.exports = { UserService };
