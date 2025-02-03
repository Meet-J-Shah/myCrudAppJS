const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// import { App } from './app';

// const app = new App();

// app.listen();
