// controllers/userController.js
const { UserService } = require('../service');

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
  static async getUserList(req, res) {
    try {
      const users = await UserService.getUserListByAdmin();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get a user by ID
  static async getUserById(req, res) {
    try {
      const userId = req.params.id; // Get the user ID from the request parameters
      const user = await UserService.getUserById(userId);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update a user
  static async updateUser(req, res) {
    try {
      const userId = req.params.id; // Get the user ID from the request parameters
      const updatedData = req.body; // Get the updated data from the request body
      const updatedUser = await UserService.updateUser(userId, updatedData);
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete a user
  static async deleteUser(req, res) {
    try {
      const userId = req.params.id; // Get the user ID from the request parameters
      await UserService.deleteUser(userId);
      res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserController;
