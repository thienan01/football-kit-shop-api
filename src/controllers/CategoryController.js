const categoryService = require("../services/categoryService");

let createNewCategory = async (req, res) => {
  try {
    let category = await categoryService.createNewCategory(req.body);
    res.status(200).json({
      errCode: 0,
      message: "Create new category successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      message: "Create new category failure",
      errorDetail: error.message,
    });
  }
};

let getAllCategory = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      errCode: 0,
      message: "Get all categories successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      message: "Can not get all categories",
      errorDetail: error.message,
    });
  }
};

let getCateByIdParam = async (req, res, next) => {
  try {
    const category = await categoryService.getCateById(req.params.cateId);
    req.category = category;
    next();
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      message: "Can not get category by this id",
      errorDetail: error.message,
    });
  }
};

let updateCategory = async (req, res) => {
  try {
    req.category.cateName = req.body.cateName;
    const updatedCate = await categoryService.updateCategory(req.category);
    res.status(200).json({
      errCode: 0,
      message: "Update category successfully",
      data: updatedCate,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      message: "Update category failure",
      errorDetail: error.message,
    });
  }
};

let deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.category);
    res.status(200).json({
      errCode: 0,
      message: "Delete cate successfully",
      data: await categoryService.getAllCategories(),
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      message: "Delete category failure",
      errorDetail: error,
    });
  }
};

let getCategoryById = (req, res) => {
  if (req.category) {
    res.status(200).json({
      errCode: 0,
      message: "Get category by id successfully",
      data: req.category,
    });
  }
};

module.exports = {
  createNewCategory: createNewCategory,
  getAllCategory: getAllCategory,
  updateCategory: updateCategory,
  getCateByIdParam: getCateByIdParam,
  deleteCategory: deleteCategory,
  getCategoryById: getCategoryById,
};
