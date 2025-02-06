// const { Router, Request, Response, NextFunction } =require('express');
const CONSTANTS = require('../constants/constant');
const User = require('../models/user.model');
const { NotFoundError } = require('../utils/error.handler');
const { SuccessResponse } = require('../utils/successResponse.handler');

class UserService {
  static async getUserList(req, res, next) {
    try {
      const users = await User.findAll({ where: { role: 'user' }, attributes: ['id', 'email', 'role', 'createdAt'] });
      if (!users) {
        throw new NotFoundError(
          CONSTANTS.RESPONSE_CODES.NOT_FOUND,
          CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_FOUND_LIST,
        );
      } else {
        return res
          .status(CONSTANTS.RESPONSE_CODES.SUCCESS)
          .json(
            new SuccessResponse(
              true,
              CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.USER_LIST,
              CONSTANTS.RESPONSE_CODES.SUCCESS,
              users,
            ),
          );
      }
    } catch (error) {
      // eslint-disable-next-line no-unused-vars
      next(error);
    }
  }

  // static async createUser(userData) {
  //   try {
  //     // Create a new user in the database
  //     const user = await User.create(userData);
  //     return user;
  //   } catch (error) {
  //     throw new Error('Error creating user');
  //   }
  // }

  // Get all users

  static async getUserListByAdmin() {
    try {
      // Get all users
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error(CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_FETCH_USERS);
    }
  }

  // Get a user by id
  static async getUserById(userId) {
    try {
      // Find a user by primary key (id)
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError(CONSTANTS.RESPONSE_CODES.NOT_FOUND, CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new Error(CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_FETCH_USER);
    }
  }

  // Update a user by id
  static async updateUser(userId, updatedData) {
    try {
      // Find user by id
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError(CONSTANTS.RESPONSE_CODES.NOT_FOUND, CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_FOUND);
      }
      // Update the user data
      await user.update(updatedData);
      return user;
    } catch (error) {
      throw new Error(CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_UPDATE);
    }
  }

  // Delete a user by id
  static async deleteUser(userId) {
    try {
      // Find the user
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError(CONSTANTS.RESPONSE_CODES.NOT_FOUND, CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_FOUND);
      }
      // Delete the user
      await user.destroy();
    } catch (error) {
      throw new Error(CONSTANTS.ERROR_MESSAGES.USER_ERRORS.NOT_DELETE);
    }
  }
}

module.exports = { UserService };
