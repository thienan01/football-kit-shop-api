const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const authController = require("../controllers/AuthController");

router.param("productId", productController.getProductByIdParam);

//[GET] /api/product
router.get("/:productId", productController.getProductById);

//[PUT] /api/product
router.put(
  "/:productId/update",
  authController.protect,
  authController.restrictTo("admin"),
  productController.updateProduct
);

//[DELETE] /api/product
router.delete(
  "/:productId/delete",
  authController.protect,
  authController.restrictTo("admin"),
  productController.deleteProduct
);

//[POST] /api/product
router.post(
  "/createNewProduct",
  authController.protect,
  authController.restrictTo("admin"),
  productController.createNewProduct
);

router.get("/", productController.getAllProducts);

module.exports = router;
