const request = require('supertest');
const express = require('express');
const router = require('../routes/auth.routes');
const db = require('../models');
const app = require('../app');
//app.use(router);
let server;
describe('Auth Routes', () => {
  beforeAll(async () => {
    // Start the server or initialize resources

    await db.sequelize.authenticate();
    //server = app.listen(3005);
  });

  afterAll(async () => {
    // Close the database connection and stop the server
    await db.sequelize.close();
    //await server.close();
  });

  afterEach(() => {
    // Reset mocks and clear timers
    jest.resetModules();
    jest.clearAllMocks();
  });
  it('should handle login requests', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test11@example.com', password: 'Meet@1234' });
    expect(response.status).toBe(200);
  });

  //   it('should handle registration requests', async () => {
  //     const response = await request(app)
  //       .post('/auth/register')
  //       .send({ email: 'tests211@example.com', password: 'Meet@1234', role: 'admin' });
  //     expect(response.status).toBe(200);
  //   });

  // Add more test cases for error handling, input validation, etc.
});
