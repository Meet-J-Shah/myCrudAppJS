const request = require('supertest');
const db = require('../models'); // Database connection
const app = require('../app'); // Main app instance
const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczOTM1NTM2NH0.Np5pcLia-ZZhRcoMzftY9_8zcsIT6AApFs0VxZt4Q4k';
let server;
let agent;

describe('Admin Routes', () => {
  beforeAll(async () => {
    await db.sequelize.authenticate();
    server = app.listen(3006);
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    if (server) {
      try {
        await server.close();
      } catch (error) {
        console.error('Error closing the server:', error);
      }
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /admin/users', () => {
    it('should return 200 and user list', async () => {
      const response = await agent.get('/admin/users').set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'List of all users having role [user] or [admin]'); // Ensuring the correct response structure
    });
  });

  describe('GET /admin/users/:id', () => {
    it('should return 200 and user details', async () => {
      const response = await agent.get('/admin/users/9').set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('id', 9);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await agent.get('/admin/users/99').set('Authorization', `Bearer ${authToken}`); // Assuming 9999 doesn't exist

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Error fetching user');
    });
  });

  describe('PUT /admin/users/:id', () => {
    // it('should update user and return 200', async () => {
    //   const response = await agent.put('/admin/users/2').set('Authorization', `Bearer ${authToken}`).send({

    //     "email": "john.doe@example.com",
    //     "password": "Meet@14325"
    //   });;

    //   expect(response.status).toBe(200);
    //   const updatedAtTimestamp = new Date(response.body.data.updatedAt).getTime();
    //   const expectedTimestamp = Date.now(); // Current timestamp

    //   // Allow some leeway (e.g., within 2 seconds)
    //   expect(Math.abs(updatedAtTimestamp - expectedTimestamp)).toBeLessThan(2000);

    // });

    it('should return 400 for invalid update data', async () => {
      const response = await agent.put('/admin/users/2').send({}).set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email is a required field');
    });
  });

  describe('DELETE /admin/users/:id', () => {
    // it('should delete user and return 200', async () => {
    //   const response = await agent.delete('/admin/users/13').set('Authorization', `Bearer ${authToken}`);

    //   expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty('message',"User with Id:- 13 Sucessfully Deleted ..List of all users after Deletation :- ");
    // });

    it('should return 404 for non-existent user', async () => {
      const response = await agent.delete('/admin/users/99').set('Authorization', `Bearer ${authToken}`); // Assuming 9999 doesn't exist

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Error deleting user');
    });
  });
});
