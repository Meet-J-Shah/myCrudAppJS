/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john' });
});

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200);
  });
});
