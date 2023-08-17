import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
// Create category controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }

    // Further logic for creating the category if it doesn't exist goes here
    // we are using slugyfy npm here to use slug
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New category is created BE",
      category, // we are passing full categry
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category ctrl",
    });
  }
};

//update category

export const updateCategoryConttroller = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Cateory is updated Successfully from backend",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error  While.. updating..  category - BE ctrl",
    });
  }
};

// to gett all the categoriees
export const CategoryConttroller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Catgeries List succes",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error  While.. getting all the ..  categories - BE ctrl",
    });
  }
};

// single category controller

export const singleCategoryConttroller = async (req, res) => {
  try {
    // const {slug} =req.params;
    // const category = await categoryModel.findOne(slug);
    const category = await categoryModel.findOne({ slug: req.params.slug }); // same this as above
    res.status(200).send({
      success: true,
      message: "Specific category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error  While.. getting A specific single  Category  - BE ctrl",
    });
  }
};

// to delete specific category

export const DeleteCategoryConttroller = async (req, res) => {
  try {
    const {id} = req.params
    await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        success: true,
        message: "Successfully Deleted Category",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error  While.. getting A specific single  Category  - BE ctrl",
    });
  }
};
