/* eslint-disable no-unused-vars */
const { Router, Request, Response, NextFunction } = require('express');
const { UserService } = require('../service');

class UserListRepository {
  // Routes will call repos, Repo will be a single responsibility class
  static async getUserList(req, res) {
    try {
      // Write computing operations here
      return UserService.getUserList(req, res);
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserListRepository;
