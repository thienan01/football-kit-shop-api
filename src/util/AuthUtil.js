const AuthService = require("../services/AuthService");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
class AuthUtil {
  static async checkEmail(email) {
    let user = await AuthService.getUserByCondition({
      email: email,
    });
    if (user) {
      return user;
    }
    return;
  }

  static async checkPassword(inputPassword, userPassword) {
    let originalPassword = CryptoJS.AES.decrypt(
      userPassword,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword === inputPassword) return true;
    else return false;
  }

  static encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
  }

  static createToken(data) {
    return jwt.sign({ _id: data }, process.env.PASS_TOKEN);
  }
}

module.exports = AuthUtil;
