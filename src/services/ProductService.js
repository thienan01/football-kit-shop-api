const Product = require("../models/Product");
const dotenv = require("dotenv");
dotenv.config();

let getAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find({});
      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newProduct = new Product(data);
      newProduct.save((err, createdProduct) => {
        if (err || !createdProduct) {
          reject(err);
        }
        resolve(createdProduct);
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    try {
      Product.findById(productId, (err, product) => {
        if (!product) {
          reject();
        }
        resolve(product);
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      await product.save((err, updatedProduct) => {
        if (err || !updatedProduct) {
          reject(err);
        }
        resolve(updatedProduct);
      });
    } catch (error) {
      reject(error);
    }
  });
};
let deleteProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      await product.remove();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewProduct: createNewProduct,
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
