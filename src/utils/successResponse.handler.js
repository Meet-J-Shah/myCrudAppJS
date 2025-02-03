class SuccessResponse {
  constructor(success, message, code, data) {
    return {
      success: success,
      message: message,
      code: code,
      data: data,
    };
  }
}

module.exports = SuccessResponse;
