const jwt = require('jsonwebtoken');
const environmentConfig = require('../constants/environment.constant');
const User = require('../models/user.model');
const { AuthFailureError } = require('../utils/error.handler');
const CONSTANTS = require('../constants/constant');
const verifyToken = () => {
  return 'Token verified';
};

// Refactored verifyUser middleware

const verifyUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AuthFailureError(
        CONSTANTS.RESPONSE_CODES.UNAUTHORIZED,
        CONSTANTS.ERROR_MESSAGES.TOKEN_ERRORS.MISSING_TOKEN,
      ); // Missing token
    }

    const scheme = authorization.split(' ')[0];
    if (scheme !== 'Bearer') {
      throw new AuthFailureError(
        CONSTANTS.RESPONSE_CODES.UNAUTHORIZED,
        CONSTANTS.ERROR_MESSAGES.TOKEN_ERRORS.NOT_BEARER,
      ); // Invalid token format
    }

    const token = authorization.split(' ')[1];
    console.log('Token:', token);

    // Verify token asynchronously and handle the error properly
    jwt.verify(token, environmentConfig.JWT_SECRET, async (err, payload) => {
      if (err) {
        // Handle invalid token or expired token errors
        return next(
          new AuthFailureError(
            CONSTANTS.RESPONSE_CODES.UNAUTHORIZED,
            CONSTANTS.ERROR_MESSAGES.TOKEN_ERRORS.INVALID_TOKEN,
          ),
        );
      }

      // Extract user ID from token payload
      const { id } = payload;
      const user = await User.findOne({ where: { id } });

      if (user) {
        req.user = user; // Attach user data to request
        next(); // Proceed to next middleware
      } else {
        // User not found in the database
        return next(
          new AuthFailureError(
            CONSTANTS.RESPONSE_CODES.UNAUTHORIZED,
            CONSTANTS.ERROR_MESSAGES.TOKEN_ERRORS.USER_NOT_FOUND,
          ),
        );
      }
    });
  } catch (error) {
    console.log('Error:', error); // Log the error for debugging
    next(error); // Pass the error to global error handler
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return next(
        new AuthFailureError(CONSTANTS.RESPONSE_CODES.UNAUTHORIZED, CONSTANTS.ERROR_MESSAGES.TOKEN_ERRORS.NOT_ADMIN),
      );
      //return res.status(400).json({ message: 'You have no permission..!', status: 400 });
    }
  } catch (error) {
    console.log('Error:', error); // Log the error for debugging
    next(error); // Pass the error to global error handler
  }
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
