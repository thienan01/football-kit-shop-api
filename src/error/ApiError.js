class ApiError {
  constructor(code, message, messageDetail) {
    this.code = code;
    this.message = message;
    this.messageDetail = messageDetail;
  }

  static badRequest(msg, msgDetail) {
    return new ApiError(400, msg, msgDetail);
  }
  static internal(msg, msgDetail) {
    return new ApiError(500, msg, msgDetail);
  }
  static notFound(msg, msgDetail) {
    return new ApiError(404, msg, msgDetail);
  }
}

module.exports = ApiError;
