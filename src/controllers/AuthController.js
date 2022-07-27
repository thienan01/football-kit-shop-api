const ApiError = require("../error/ApiError");
const AuthService = require("../services/AuthService");
const AuthUtil = require("../util/AuthUtil");

let sendToken = (user, token, statusCode, req, res) => {
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    httpOnly: true, //cookie can not be accessed or modified in any way by browser
  });

  user.password = undefined;
  res.status(statusCode).json({
    message: "Successful",
    token,
    data: {
      user,
    },
  });
};

let register = async (req, res, next) => {
  try {
    //Check user exits or not
    if (await AuthUtil.checkEmail(req.body.email))
      return next(ApiError.badRequest("This email already exits!"));

    //if user dose not exits, Create new user
    //hash password
    req.body.password = AuthUtil.encryptPassword(req.body.password);

    const user = await AuthService.createNewUser(req.body);
    const token = AuthUtil.createToken({ id: user._id });
    sendToken(user, token, 201, req, res);
  } catch (error) {
    return next(ApiError.badRequest("Create new user failure", error.message));
  }
};

let login = async (req, res, next) => {
  const { email, password } = req.body;

  //check email exits or not
  const exitsUser = await AuthUtil.checkEmail(email);
  if (exitsUser) {
    if (await AuthUtil.checkPassword(password, exitsUser.password)) {
      const token = AuthUtil.createToken(exitsUser._id);
      sendToken(exitsUser, token, 200, req, res);
    } else {
      return next(ApiError.notFound("Password incorrect"));
    }
  } else next(ApiError.notFound("incorrect email or email does not exits"));
};

let logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "Successful",
  });
};

let protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return next(
      ApiError.unauthorized("You are not logged, Please login to continue!!")
    );

  let decodedToken = AuthUtil.verifyToken(token);
  if (!decodedToken._id) return next(ApiError.unauthorized("Invalid token"));

  const currentUser = await AuthService.getUserByCondition({
    _id: decodedToken._id,
  });
  req.user = currentUser;
  next();
};

let restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.type))
      return next(
        ApiError.forbidden("You do not have permission to perform this action!")
      );
    next();
  };
};

module.exports = {
  register: register,
  login: login,
  logout: logout,
  protect: protect,
  restrictTo: restrictTo,
};
