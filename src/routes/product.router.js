const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.param("productId", productController.getProductByIdParam);
router.get("/:productId", productController.getProductById);
router.put("/:productId/update", productController.updateProduct);
router.delete("/:productId/delete", productController.deleteProduct);

router.post("/createNewProduct", productController.createNewProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
