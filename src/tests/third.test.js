/* eslint-disable no-unused-vars */
const request = require('supertest');
const app = require('../app'); // Import your Express app
const db = require('../models');
let server;
describe('Server Initialization', () => {
  it('should start the server and connect to the database', async () => {
    // Mock the database connection
    jest.spyOn(db.sequelize, 'authenticate').mockResolvedValueOnce();

    const response = await request(app).get('/');
    console.log(response.text);
    expect(response.statusCode).toBe(200); // Assuming no route for "/"
  });

  //   it('should handle database connection errors', async () => {
  //     // Mock the database connection to throw an error
  //     jest.spyOn(db.sequelize, 'authenticate').mockRejectedValueOnce(new Error('Database connection failed'));

  //     const response = await request(app).get('/');
  //     console.log(response.text);
  //     expect(response.statusCode).toBe(200); // Internal server error
  //   });
});

describe('Middleware', () => {
  beforeAll(async () => {
    // server = app.listen(3002);
    // Start the server or initialize resources
    await db.sequelize.authenticate();
  });

  afterAll(async () => {
    // Close the database connection and stop the server
    await db.sequelize.close();
  });

  afterEach(() => {
    // Reset mocks and clear timers
    jest.resetModules();
    jest.clearAllMocks();
  });
  it('should apply helmet middleware', async () => {
    const response = await request(app).get('/');
    expect(response.headers['x-powered-by']).toBeUndefined(); // Helmet removes this header
  });

  it('should apply express.json() middleware', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ email: 'Joh1sqn@gmail.com', password: 'Doe@1234', role: 'user' });
    expect(response.statusCode).not.toBe(400); // Ensure JSON parsing works
  });
});
