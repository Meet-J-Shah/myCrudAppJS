/* eslint-disable no-unused-vars */
const { Router, Request, Response, NextFunction } = require('express');
const { UserService } = require('../service');

class UserListRepository {
  // Routes will call repos, Repo will be a single responsibility class
  static async getUserList(req, res) {
    try {
      // Write computing operations here
      return UserService.getUserList(req, res);
    } catch (error) {
      return res
        .status(error.code)
        .json({ msg: error.message, name: error.name, data: error.data, stack: error.stack });
    }
  }
}

module.exports = UserListRepository;
