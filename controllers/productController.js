import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
// create product

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields; //contains non-file fields
    const { photo } = req.files; // contains files
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      //   case !slug:
      //     return res.status(500).send({ error: "Slug is Required" });
      case !description:
        return res.status(500).send({ error: "Price is Required" });
      case !price:
        return res.status(500).send({ error: "Category is Required" });
      case !category:
        return res.status(500).send({ error: "Name is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      // for photo
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error  While Creating a product BE ctrl",
    });
  }
};
//update the product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields; //contains non-file fields
    const { photo } = req.files; // contains files
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      //   case !slug:
      //     return res.status(500).send({ error: "Slug is Required" });
      case !description:
        return res.status(500).send({ error: "Price is Required" });
      case !price:
        return res.status(500).send({ error: "Category is Required" });
      case !category:
        return res.status(500).send({ error: "Name is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      // for photo
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error  While Updating a product BE ctrl",
    });
  }
};

// To Get all the Product
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .exec(); // Execute the query

    res.status(200).send({
      success: true,
      message: "All Products BE",
      products,
      countTotal: products.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Retrieving Products",
    });
  }
};

//  get single product

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Here is your desired product ",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Retrieving Products",
    });
  }
};
// get photo

export const getSingleProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Retrieving Products",
    });
  }
};
// delete product

export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "product deleted Successfully...",
      //   product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Retrieving Products",
    });
  }
};

// filter products
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count controller

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Counting Products",
      error,
    });
  }
};

// product list based on page

export const productListController = async (req, res) => {
  try {
    const perPge = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPge)
      .limit(perPge)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page ctrl",
      error,
    });
  }
};
