/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { UserService } = require('../service');
const User = require('../models/user.model');
const { NotFoundError } = require('../utils/error.handler');
const { CONSTANTS } = require('../constants/constant');
const { UserController } = require('../controllers');
jest.mock('../models/user.model');
UserService.getUserList = jest.fn();
describe('UserService', () => {
  // it('should get user list successfully', async () => {
  //   User.findAll.mockResolvedValue([{ id: 1, email: 'user1@example.com' }]);
  //   const users = await UserService.getUserList();
  //   expect(users).toEqual([{ id: 1, email: 'user1@example.com' }]);
  // });

  // it('should handle getUserList error', async () => {
  //   User.findAll.mockRejectedValue(new Error('Error fetching users'));
  //   await expect(UserService.getUserList()).rejects.toThrow('Error fetching users');
  // });

  it('should get a list of users successfully', async () => {
    const mockUsers = [
      {
        id: 1,
        email: 'user1@example.com',
        role: 'user',
        createdAt: new Date(),
      },
      {
        id: 2,
        email: 'user2@example.com',
        role: 'user',
        createdAt: new Date(),
      },
    ];

    UserService.getUserList.mockResolvedValueOnce(mockUsers);

    const req = {}; // Create an empty request object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await UserController.getUserList(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      }),
    );
  });

  // it('should handle error when no users are found', async () => {
  //   User.findAll.mockResolvedValue(null);
  //   await expect(UserService.getUserList()).rejects.toThrow(Error);
  // });

  // // Add a test case for handling database errors
  // it('should handle database error', async () => {
  //   User.findAll.mockRejectedValue(new Error('Error fetching users'));
  //   await expect(UserService.getUserList()).rejects.toThrow('Error fetching users');
  // });

  it('should get user list successfully', async () => {
    User.findAll.mockResolvedValue([{ id: 1, email: 'user1@example.com' }]);
    const users = await UserService.getUserListByAdmin();
    expect(users).toEqual([{ id: 1, email: 'user1@example.com' }]);
  });

  it('should handle getUserList error', async () => {
    User.findAll.mockRejectedValue(new Error('Error fetching users'));
    await expect(UserService.getUserListByAdmin()).rejects.toThrow('Error fetching users');
  });

  it('should get user by ID successfully', async () => {
    User.findByPk.mockResolvedValue({ id: 1, email: 'user1@example.com' });
    const user = await UserService.getUserById(1);
    expect(user).toEqual({ id: 1, email: 'user1@example.com' });
  });

  it('should throw NotFoundError if user not found', async () => {
    User.findByPk.mockResolvedValue(null);
    await expect(UserService.getUserById(1)).rejects.toThrow(Error);
  });
});
