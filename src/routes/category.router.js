const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const authController = require("../controllers/AuthController");

//[POST] /api/category/createNewCategory
router.post(
  "/createNewCategory",
  authController.protect,
  authController.restrictTo("admin"),
  categoryController.createNewCategory
);

router.param("cateId", categoryController.getCateByIdParam);

//[GET] /api/category/:cateId
router.get("/:cateId", categoryController.getCategoryById);

//[PUT] /api/category/:cateId/update
router.put(
  "/:cateId/update",
  authController.protect,
  authController.restrictTo("admin"),
  categoryController.updateCategory
);

//[DELETE] /api/category/:cateId/delete
router.delete(
  "/:cateId/delete",
  authController.protect,
  authController.restrictTo("admin"),
  categoryController.deleteCategory
);

router.get("/", categoryController.getAllCategory);
module.exports = router;
