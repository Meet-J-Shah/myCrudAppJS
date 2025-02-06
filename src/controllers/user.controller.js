// controllers/userController.js
const { UserService } = require('../service');
const CONSTANTS = require('../constants/constant');
const { QueryError } = require('../utils/error.handler');
const { SuccessResponse } = require('../utils/successResponse.handler');

class UserController {
  // Create a new user
  //   static async createUser(req, res) {
  //     try {
  //       const userData = req.body; // Get data from the request body
  //       const user = await UserService.createUser(userData);
  //       res.status(201).json({ success: true, data: user });
  //     } catch (error) {
  //       res.status(500).json({ success: false, message: error.message });
  //     }
  //   }

  // Get a list of users
  static async getUserList(req, res, next) {
    try {
      try {
        const users = await UserService.getUserListByAdmin();

        res
          .status(CONSTANTS.RESPONSE_CODES.SUCCESS)
          .json(
            new SuccessResponse(
              true,
              CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.ADMIN_LIST,
              CONSTANTS.RESPONSE_CODES.SUCCESS,
              users,
            ),
          );
      } catch (error) {
        throw new QueryError(CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR, error.message);
      }
    } catch (error) {
      console.log('Error:', error); // Log the error for debugging
      next(error); // Pass the error to global error handler
    }
  }

  // Get a user by ID
  static async getUserById(req, res, next) {
    try {
      try {
        const userId = req.params.id; // Get the user ID from the request parameters
        const user = await UserService.getUserById(userId);
        res
          .status(CONSTANTS.RESPONSE_CODES.SUCCESS)
          .json(
            new SuccessResponse(
              true,
              CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.USER_FETCH1 +
                userId +
                CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.USER_FETCH2,
              CONSTANTS.RESPONSE_CODES.SUCCESS,
              user,
            ),
          );
        //res.status(CONSTANTS.RESPONSE_CODES.SUCCESS).json({ success: true, data: user });
      } catch (error) {
        throw new QueryError(CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR, error.message);
      }
    } catch (error) {
      console.log('Error:', error); // Log the error for debugging
      next(error); // Pass the error to global error handler
    }
  }

  // Update a user
  static async updateUser(req, res, next) {
    try {
      try {
        const userId = req.params.id; // Get the user ID from the request parameters
        const updatedData = req.body; // Get the updated data from the request body
        const updatedUser = await UserService.updateUser(userId, updatedData);
        res
          .status(CONSTANTS.RESPONSE_CODES.SUCCESS)
          .json(
            new SuccessResponse(
              true,
              CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.USER_UPDATE1 +
                userId +
                CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.USER_UPDATE2,
              CONSTANTS.RESPONSE_CODES.SUCCESS,
              updatedUser,
            ),
          );
        //res.status(CONSTANTS.RESPONSE_CODES.SUCCESS).json({ success: true, data: updatedUser });
      } catch (error) {
        throw new QueryError(CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR, error.message);
      }
    } catch (error) {
      console.log('Error:', error); // Log the error for debugging
      next(error); // Pass the error to global error handler
    }
  }

  // Delete a user
  static async deleteUser(req, res, next) {
    try {
      try {
        const userId = req.params.id; // Get the user ID from the request parameters
        await UserService.deleteUser(userId);
        const users = await UserService.getUserListByAdmin();
        res
          .status(CONSTANTS.RESPONSE_CODES.SUCCESS)
          .json(
            new SuccessResponse(
              true,
              CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.USER_DELETE1 +
                userId +
                CONSTANTS.RESPONSE_MESSAGES.USER_RESPONSES.USER_DELETE2,
              CONSTANTS.RESPONSE_CODES.SUCCESS,
              users,
            ),
          );
        //res.status(CONSTANTS.RESPONSE_CODES.SUCCESS).json({ success: true, message: 'User deleted' });
      } catch (error) {
        throw new QueryError(CONSTANTS.RESPONSE_CODES.INTERNAL_SERVER_ERROR, error.message);
      }
    } catch (error) {
      console.log('Error:', error); // Log the error for debugging
      next(error); // Pass the error to global error handler
    }
  }
}

module.exports = UserController;
