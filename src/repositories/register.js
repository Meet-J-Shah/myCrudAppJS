const { AuthService } = require('../service');

class RegisterRepository {
  // Routes will call repos, Repo will be a single responsibility class
  static async register(req, res) {
    try {
      // Write computing operations here
      return AuthService.register(req, res);
    } catch (err) {
      return err;
    }
  }
}

module.exports = { RegisterRepository };
