/* eslint-disable no-undef */

jest.mock('../models/user.model', () => ({
  findOne: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

const { UserController } = require('../controllers');
const { UserService } = require('../service');
const { QueryError } = require('../utils/error.handler');
const CONSTANTS = require('../constants/constant');

jest.mock('../service');

describe('UserController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should get user list successfully', async () => {
    UserService.getUserListByAdmin.mockResolvedValue([{ id: 1, email: 'user1@example.com' }]);
    await UserController.getUserList(req, res, next);
    expect(res.status).toHaveBeenCalledWith(CONSTANTS.RESPONSE_CODES.SUCCESS);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: [{ id: 1, email: 'user1@example.com' }],
      }),
    );
  });

  it('should handle getUserList error', async () => {
    UserService.getUserListByAdmin.mockRejectedValue(new Error('Database error'));
    await UserController.getUserList(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(QueryError));
  });

  it('should get user by ID successfully', async () => {
    req.params.id = 1;
    UserService.getUserById.mockResolvedValue({ id: 1, email: 'user1@example.com' });
    await UserController.getUserById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(CONSTANTS.RESPONSE_CODES.SUCCESS);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: { id: 1, email: 'user1@example.com' },
      }),
    );
  });

  it('should handle getUserById error', async () => {
    req.params.id = 1;
    UserService.getUserById.mockRejectedValue(new Error('Database error'));
    await UserController.getUserById(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(QueryError));
  });

  // Add more test cases for updateUser, deleteUser, and error handling
});
