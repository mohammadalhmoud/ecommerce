import React, { useState, useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

function PlaceOrder() {
  const [method, setMethod] = useState("");
  const navigate = useNavigate("");
  const {
    token,
    cartItems,
    setCartItems,
    backendUrl,
    products,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const product = structuredClone(
              products.find((product) => product._id === items)
            );
            if (product) {
              product.size = item;
              product.quantity = cartItems[items][item];
              orderItems.push(product);
            }
          }
        }
      }
      const orderData = {
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        address: formData,
      };
      if (token) {
        switch (method) {
          case "cod": {
            const response = await axios.post(
              backendUrl + "/api/order/place",
              {
                ...orderData,
                paymentmethod: method,
              },
              {
                headers: {
                  token,
                },
              }
            );
            if (response.data.success) {
              try {
                const response = await axios.post(backendUrl+'/api/cart/clear',{},{headers:{token}})
                if(response.data.success){
                  setCartItems({});
                  toast.success(response.data.message);
                  navigate("/orders");
                }else {
                  console.log(response.data.message)
                }
              
              } catch (error) {
                console.log(error);
              }
            } else {
              toast.error(response.data.message);
            }
            break;
          } case "stripe":{
            const response = await axios.post(backendUrl+'/api/order/stripe',{...orderData,paymentmethod:method},{headers:{token}})
            if(response.data.success){
              const {session_url} = response.data
              window.location.replace(session_url)
            }else{
              toast.error(response.data.message)
            }
            break;
          }
          default:
            break;
        }
      } else {
        try {
          const response = await axios.post(backendUrl + "/api/order/guest", {
            ...orderData,
            paymentmethod: method,
          });
          console.log(response.data);
          if (response.data.success) {
            navigate("/");
            setCartItems({});
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  

 
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[60vh] border-t"
    >
      {/*---------Left Side------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[450px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={handleChange}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          onChange={handleChange}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            onChange={handleChange}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            onChange={handleChange}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={handleChange}
            name="zip"
            value={formData.zip}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="ZIP"
          />
          <input
            onChange={handleChange}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          onChange={handleChange}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>
      {/*----------Right Side------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/*------select payment method------------ */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
