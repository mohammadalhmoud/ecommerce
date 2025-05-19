import express from "express";
import {
  addToCart,
  getCart,
  removeAllFromCart,
  updateCart,
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const cartRouter = express.Router();

// Route to add an item to the cart
cartRouter.post("/add", auth, addToCart);
// Route to get the cart items
cartRouter.post("/get", auth, getCart)
// Route to remove an item from the cart
cartRouter.delete("/remove/:id", auth, removeAllFromCart);
// Route to update the quantity of an item in the cart
cartRouter.put("/update", auth, updateCart);
//Route for clear all items in cart after place an order
cartRouter.post("/clear", auth, removeAllFromCart);

export default cartRouter;
