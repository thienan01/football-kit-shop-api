const User = require("../models/User");

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    const user = new User(data);
    await user.save((err, createdUser) => {
      if (err || !createdUser) {
        reject(err);
      }
      resolve(createdUser);
    });
  });
};
let getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, allUser) => {
      if (err || !allUser) reject(err);
      resolve(allUser);
    });
  });
};
let getUserByCondition = (condition) => {
  return new Promise((resolve, reject) => {
    User.findOne(condition, (err, user) => {
      resolve(user);
    });
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  getUserByCondition: getUserByCondition,
};
