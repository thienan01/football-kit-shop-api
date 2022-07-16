const ApiError = require("./ApiError");

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({
      message: err.message,
      messageDetail: err.messageDetail,
    });
  }
  return res.status(500).json({
    message: "Something went wrong!!",
  });
};

module.exports = apiErrorHandler;
