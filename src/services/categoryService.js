const Category = require("../models/Category");

let createNewCategory = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const category = new Category(data);
      category.save((err, createdCate) => {
        if (err || !createdCate) {
          reject(err);
        }
        resolve(createdCate);
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCategories = () => {
  return new Promise((resolve, reject) => {
    try {
      Category.find((err, categories) => {
        if (err || !categories) {
          reject(err);
        }
        resolve(categories);
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getCateById = (cateId) => {
  return new Promise((resolve, reject) => {
    try {
      Category.findById(cateId, (err, cate) => {
        if (err || !cate) {
          reject(err);
        }
        resolve(cate);
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateCategory = (data) => {
  return new Promise((resolve, reject) => {
    data.save((err, updatedCate) => {
      if (err || !updatedCate) {
        reject(err);
      }
      resolve(updatedCate);
    });
  });
};

let deleteCategory = (data) => {
  return new Promise( (resolve, reject) => {
    try {
      data.remove();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewCategory: createNewCategory,
  getAllCategories: getAllCategories,
  getCateById: getCateById,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
