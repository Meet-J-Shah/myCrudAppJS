const { AuthService } = require('../service/index');

//console.log('AuthService:', AuthService);

class LoginRepository {
  // Routes will call repos, Repo will be a single responsibility class
  static async login(req, res) {
    try {
      // Write computing operations here
      return AuthService.login(req, res);
    } catch (err) {
      return err;
    }
  }
}

module.exports = LoginRepository;
