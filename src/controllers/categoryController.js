import Category from "../models/Category.js";

const createCategory = async (req, res) => {
  const { createdBy, name } = req.body;

  if (!createdBy) {
    return res.status(404).json({
      success: false,
      msg: "you have not permission for creating category",
    });
  }

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    return res.status(400).json({
      success: false,
      msg: "already exists",
    });
  }

  const categoryData = { ...req.body };
  const category = await Category.create(categoryData);
  res.status(201).json({ success: true, msg: "category created successfully" });
};

const getCategory = async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(404).json({ success: false, msg: "Category not found" });
  }

  res
    .status(200)
    .json({ success: true, data: category, msg: "request successfull" });
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const updateCategoryData = req.body;
  const category = await Category.findByIdAndUpdate(
    categoryId,
    updateCategoryData,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category) {
    return res.status(404).json({ success: false, msg: "Category not found" });
  }
  res
    .status(200)
    .json({ success: true, data: category, msg: "successfully updated" });
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    return res.status(404).json({ success: false, msg: "Category not found" });
  }

  res.status(200).json({ success: true, msg: "Category deleted successfully" });
};

const getALLCategories = async (req, res) => {
  const category = await Category.find();
  const categoryCount = await Category.countDocuments();

  res.status(200).json({
    success: true,
    count: categoryCount,
    data: category,
    msg: "successfully request",
  });
};

export {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getALLCategories,
};
