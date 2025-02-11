const { AuthService } = require('../service/auth.service');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthFailureError, NotFoundError, BadRequestError } = require('../utils/error.handler');
const { CONSTANTS } = require('../constants/constant');
const environmentConfig = require('../constants/environment.constant');

jest.mock('../models/user.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should throw BadRequestError if email or password is missing', async () => {
    await AuthService.login(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
  });

  it('should throw NotFoundError if user not found', async () => {
    req.body = { email: 'test@example.com', password: 'password' };
    User.findOne.mockResolvedValue(null);
    await AuthService.login(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
  });

  it('should throw AuthFailureError if password does not match', async () => {
    req.body = { email: 'test@example.com', password: 'password' };
    User.findOne.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
    });
    bcrypt.compareSync.mockReturnValue(false);
    await AuthService.login(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(AuthFailureError));
  });

  it('should successfully login and generate token', async () => {
    req.body = { email: 'test@example.com', password: 'password' };
    User.findOne.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
    });
    bcrypt.compareSync.mockReturnValue(true);
    jwt.sign.mockReturnValue('valid_token');
    await AuthService.login(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          token: 'Bearer valid_token',
        }),
      }),
    );
  });

  // Add more test cases for register() method, error handling, etc.
});
