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
  static unauthorized(msg, msgDetail) {
    return new ApiError(401, msg, msgDetail);
  }
  static forbidden(msg, msgDetail) {
    return new ApiError(403, msg, msgDetail);
  }
}

module.exports = ApiError;
