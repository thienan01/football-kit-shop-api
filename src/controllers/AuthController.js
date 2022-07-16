const ApiError = require("../error/ApiError");
const AuthService = require("../services/AuthService");
const AuthUtil = require("../util/AuthUtil");

let register = async (req, res, next) => {
  try {
    //Check user exits or not
    if (await AuthUtil.checkEmail(req.body.email))
      return next(ApiError.badRequest("This email already exits!"));

    //if user dose not exits, Create new user
    //hash password
    req.body.password = AuthUtil.encryptPassword(req.body.password);

    const user = await AuthService.createNewUser(req.body);
    res.status(200).json({
      message: "Create new user successfully",
      data: user,
    });
  } catch (error) {
    return next(ApiError.badRequest("Create new user failure", error.message));
  }
};

let login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //check email exits or not
  const exitsUser = await AuthUtil.checkEmail(email);
  if (exitsUser) {
    if (await AuthUtil.checkPassword(password, exitsUser.password)) {
      const token = AuthUtil.createToken(exitsUser._id);
      res.status(200).json({
        message: "Login successfully",
        data: {
          email: exitsUser.email,
          fullName: exitsUser.fullName,
          phoneNumber: exitsUser.phoneNumber,
          type: exitsUser.type,
          address: exitsUser.address,
        },
        token: token,
      });
    } else {
      return next(ApiError.notFound("Password incorrect"));
    }
  } else next(ApiError.notFound("incorrect email or email does not exits"));
};

module.exports = {
  register: register,
  login: login,
};
