const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
router.post("/createNewCategory", categoryController.createNewCategory);
router.param("cateId", categoryController.getCateByIdParam);
router.get("/:cateId", categoryController.getCategoryById)
router.put("/:cateId/update", categoryController.updateCategory);
router.delete("/:cateId/delete", categoryController.deleteCategory);
router.get("/", categoryController.getAllCategory);
module.exports = router;
