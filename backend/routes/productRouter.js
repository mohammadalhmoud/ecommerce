import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const router = express.Router();
// Route to add a new product
router.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
// Route to get all products
router.get("/list", getAllProducts);
// Route to get a single product by ID
router.get("/:id", getProduct);
// Route to update a product by ID
router.put("/:id", updateProduct);
// Route to delete a product by ID
router.delete("/remove", adminAuth ,deleteProduct);
// Export the router
export default router;
// This code defines an Express router for handling product-related routes in a web application.
// It imports the necessary modules and functions, sets up the routes for adding, retrieving, updating, and deleting products, and exports the router for use in other parts of the application.
// The router uses the productController functions to handle the logic for each route.
// The routes are defined as follows:
// - POST /add: Adds a new product.
// - GET /: Retrieves all products.
// - GET /:id: Retrieves a single product by its ID.
// - PUT /:id: Updates a product by its ID.
// - DELETE /:id: Deletes a product by its ID.
// The router is then exported for use in other parts of the application.
