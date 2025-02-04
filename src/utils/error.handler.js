class BaseError extends Error {
  constructor(code, message, data) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
  }
}

class BadRequestError extends BaseError {}
class ForbiddenError extends BaseError {}
class AuthFailureError extends BaseError {}
class InternalError extends BaseError {}
class NotFoundError extends BaseError {}

module.exports = {
  BaseError,
  BadRequestError,
  ForbiddenError,
  AuthFailureError,
  InternalError,
  NotFoundError,
};
