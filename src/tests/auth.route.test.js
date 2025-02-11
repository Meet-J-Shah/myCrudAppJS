const request = require('supertest');
const db = require('../models');
const app = require('../app');

let server;
let agent;

describe('Auth Routes', () => {
  beforeAll(async () => {
    await db.sequelize.authenticate();
    server = app.listen(3005);
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();

      if (server) {
        await new Promise((resolve) => server.close(resolve)); // Ensures proper shutdown
      }
    } catch (error) {
      console.error('Error closing server:', error);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    it('should return 200 and token on successful login', async () => {
      const response = await agent.post('/auth/login').send({
        email: 'test2@example.com',
        password: 'Meet@1234',
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await agent.post('/auth/login').send({
        email: 'wrong@example.com',
        password: 'WrongPwd@123',
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'No User Founded with given Credentials'); // Fixed typo
    });

    it('should return 400 for missing fields', async () => {
      const response = await agent.post('/auth/login').send({ email: '' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email must contain value');
    });
  });

  describe('POST /auth/register', () => {
    it('should return 200 on successful registration', async () => {
      const uniqueEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
      const response = await agent.post('/auth/register').send({
        email: uniqueEmail,
        password: 'Meet@1234',
        role: 'admin',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'New user registered successfully');
    });

    it('should return 409 if user already exists', async () => {
      const response = await agent.post('/auth/register').send({
        email: 'test2@example.com',
        password: 'Meet@1234',
        role: 'user',
      });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message', 'User already exist with given credentials!');
    });

    it('should return 400 for missing fields', async () => {
      const response = await agent.post('/auth/register').send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email is a required field');
    });
  });
});
