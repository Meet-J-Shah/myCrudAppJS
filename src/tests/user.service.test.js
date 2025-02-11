const { UserService } = require('../service');
const User = require('../models/user.model');
const { NotFoundError } = require('../utils/error.handler');
const { CONSTANTS } = require('../constants/constant');

jest.mock('../models/user.model');

describe('UserService', () => {
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

  // Add more test cases for updateUser, deleteUser, and error handling
});
