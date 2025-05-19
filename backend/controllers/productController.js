import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
// function to add a new product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      sizes,
      subCategory,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );
    let imageUrls = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    // create a new product
    const newProduct = new productModel({
      name,
      price: Number(price),
      description,
      category,
      sizes: JSON.parse(sizes),
      subCategory,
      bestseller: bestseller == "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    });
    // save the product to the database
    const product = await newProduct.save();
    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function to get all products

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function to get a single product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// function to update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    const product = await productModel.findByIdAndUpdate(
      id,
      { name, price, description, category },
      { new: true }
    );
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    await productModel.findByIdAndDelete(req.body.id);

    await userModel.updateMany(
      { [`cartData.${productId}`]: { $exists: true } },
      { $unset: { [`cartData.${productId}`]: "" } }
    );

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
