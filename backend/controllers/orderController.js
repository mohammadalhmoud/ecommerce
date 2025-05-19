import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import userModel from "../models/userModel.js"

// golobal variables
const currency = 'usd';
const deliveryCharge = 1000;
//gateway intilaize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place order using cod
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentmethod } = req.body;
    const date = new Date().toLocaleString();
    const order = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentmethod,
      payment: false,
      date,
    });
    await order.save();
    res
      .status(201)
      .json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// place cod order using guest
const guestOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentmethod } = req.body;
    const date = new Date().toLocaleString();
    const order = new orderModel({
      items,
      amount,
      address,
      paymentmethod,
      payment: false,
      date,
    });
    await order.save();
    res
      .status(201)
      .json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// place order using razorpay
const placeOrderRazorpay = async (req, res) => {};

//place order using stripe


const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentmethod } = req.body;
    const date = new Date().toLocaleString();
    const { origin } = req.headers;

    const order = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentmethod,
      payment: false,
      date,
    });

    await order.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Ensure it's an integer
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ success: false, message: "Stripe checkout failed", error: error.message });
  }
};

const verifyStripe = async (req,res) => {
  try {
    const {orderId , success , userId } = req.body;
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true})
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

// update order status from admin
const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
  }
};

// get all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all orders for user
const userOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await orderModel.find({ userId });
    if (orders.length > 0) {
      res.status(200).json({ success: true, orders });
    } else {
      res.status(201).json({ success: false, message: "No orders found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateOrderStatus,
  getAllOrders,
  userOrders,
  guestOrder,
  verifyStripe
};
