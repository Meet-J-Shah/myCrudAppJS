const request = require('supertest');
const express = require('express');
const router = require('../routes');
const { verifyUser, verifyAdmin } = require('../middleware');

const app = express();
app.use('/api/admin', router);

jest.mock('../middleware');
jest.mock('../controllers');

describe('Admin Routes', () => {
  it('should get user list', async () => {
    verifyUser.mockImplementation((req, res, next) => next());
    verifyAdmin.mockImplementation((req, res, next) => next());
    await request(app).get('/admin/users').expect(200);
    expect(UserController.getUserList).toHaveBeenCalledTimes(1);
  });

  it('should get user by ID', async () => {
    verifyUser.mockImplementation((req, res, next) => next());
    verifyAdmin.mockImplementation((req, res, next) => next());
    await request(app).get('/admin/users/1').expect(200);
    expect(UserController.getUserById).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.any(Function),
      '1',
    );
  });

  it('should update user', async () => {
    verifyUser.mockImplementation((req, res, next) => next());
    verifyAdmin.mockImplementation((req, res, next) => next());
    await request(app).put('/admin/users/1').send({ name: 'Updated Name' }).expect(200);
    expect(UserController.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.any(Function),
      '1',
      { name: 'Updated Name' },
    );
  });

  it('should delete user', async () => {
    verifyUser.mockImplementation((req, res, next) => next());
    verifyAdmin.mockImplementation((req, res, next) => next());
    await request(app).delete('/admin/users/1').expect(200);
    expect(UserController.deleteUser).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.any(Function),
      '1',
    );
  });
});
