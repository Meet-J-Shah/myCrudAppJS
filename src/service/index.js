console.log('In a Service');

const { AuthService } = require('./auth');
//const auth = require('./auth');
const user = require('./user');

module.exports = { AuthService, user };
