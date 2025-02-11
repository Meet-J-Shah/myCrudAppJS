/* eslint-disable no-undef */

jest.mock('../models/user.model', () => ({
  findOne: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));
