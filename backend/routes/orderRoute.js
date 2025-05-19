import express from "express";
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateOrderStatus,
  userOrders,
  getAllOrders,
  guestOrder,
  verifyStripe
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

//admin
orderRouter.post("/status", adminAuth, updateOrderStatus);
orderRouter.post("/orders",adminAuth,getAllOrders)

//payment
orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/razorpay", auth, placeOrderRazorpay);
orderRouter.post("/stripe", auth, placeOrderStripe);

//guest
orderRouter.post("/guest", guestOrder);
orderRouter.post("/razorpay/guest", guestOrder);
orderRouter.post("/stripe/guest", guestOrder);

//user
orderRouter.post("/userorders", auth, userOrders);

//verify payment
orderRouter.post('/verifyStripe',auth,verifyStripe)

export default orderRouter;
