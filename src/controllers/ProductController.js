const ApiError = require("../error/ApiError");
const productService = require("../services/ProductService");

let getAllProducts = async (req, res) => {
  let products = await productService.getAllProducts();
  if (products.length > 0) {
    res.status(200).json({
      errCode: 0,
      message: "Get all product successfully",
      data: products,
    });
  }
};

let createNewProduct = async (req, res, next) => {
  try {
    let product = await productService.createNewProduct(req.body);
    res.status(200).json({
      errCode: 0,
      message: "Create new product successfully",
      data: product,
    });
  } catch (error) {
    next(ApiError.badRequest("Create new product failure!", error.message));
  }
};

let getProductByIdParam = async (req, res, next) => {
  try {
    let product = await productService.getProductById(req.params.productId);
    req.product = product;
    next();
  } catch (error) {
    res.status(400).json({
      errCode: 1,
      message: "Get product failure, Check your Id product",
    });
  }
};

let getProductById = (req, res) => {
  let product = req.product;
  return res.status(200).json({
    errCode: 0,
    message: "Get product by id successfully",
    product: product,
  });
};

let updateProduct = async (req, res, next) => {
  try {
    req.product.name = req.body.name;
    req.product.image = req.body.image;
    req.product.price = req.body.price;
    req.product.size = req.body.size;
    req.product.description = req.body.description;
    req.product.quantity = req.body.quantity;

    let updatedProduct = await productService.updateProduct(req.product);
    res.status(200).json({
      errCode: 0,
      message: "Update product successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(ApiError.badRequest("Update product failure", error.message));
  }
};

let deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.product);
    res.status(200).json({
      errCode: 0,
      message: "Delete product successfully",
      data: await productService.getAllProducts(),
    });
  } catch (error) {
    next(ApiError.internal("Update product failure", error.message));
  }
};
module.exports = {
  getAllProducts: getAllProducts,
  createNewProduct: createNewProduct,
  getProductByIdParam: getProductByIdParam,
  getProductById: getProductById,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
