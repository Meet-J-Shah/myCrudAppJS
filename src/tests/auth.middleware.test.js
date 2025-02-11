const { verifyUser, verifyAdmin } = require('../middleware');
const { AuthFailureError } = require('../utils/error.handler');
const jwt = require('jsonwebtoken');

jest.mock('../models/user.model', () => ({
  findOne: jest.fn(),
}));
jest.mock('jsonwebtoken');

const User = require('../models/user.model'); // Assign User after mocking

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should throw error if authorization header is missing', async () => {
    await verifyUser(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(AuthFailureError));
  });

  it('should throw error if authorization scheme is not Bearer', async () => {
    req.headers.authorization = 'Basic sometoken';
    await verifyUser(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(AuthFailureError));
  });

  it('should throw error if token is invalid', async () => {
    req.headers.authorization = 'Bearer invalidtoken';
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(new Error('Invalid token'));
    });
    await verifyUser(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(AuthFailureError));
  });

  it('should throw error if user not found', async () => {
    req.headers.authorization = 'Bearer validtoken';
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(null, { id: 1 });
    });

    User.findOne.mockResolvedValue(null);
    await verifyUser(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(AuthFailureError));
  });

  it('should proceed to next middleware if user is found', async () => {
    req.headers.authorization = 'Bearer validtoken';
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(null, { id: 1 });
    });

    User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });
    await verifyUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toBeDefined();
  });

  it('should deny access for non-admin users', async () => {
    req.user = { role: 'user' };
    await verifyAdmin(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(AuthFailureError));
  });

  it('should allow access for admin users', async () => {
    req.user = { role: 'admin' };
    await verifyAdmin(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
