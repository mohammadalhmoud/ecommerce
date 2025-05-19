import React from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const Quantity = (orderId) => {
    let totalQuantity = 0;
    const orderData = orders.filter((item) => item._id === orderId.orderId);
    orderData.map((order) => {
      order.items.map((item) => {
        totalQuantity += item.quantity;
      });
    });
    return <span>{totalQuantity}</span>;
  };
  const fetchOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/orders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <p className="mb-2">All Orders</p>
      <div className="flex flex-col-reverse gap-3">
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="flex flex-col border border-gray-300 overflow-scroll "
            >
              <div className="flex bg-gray-200 p-2 justify-between ">
                <p className=" text-gray-400 text-sm">Order ID : {order._id}</p>
                <Link to={`/order/${order._id}`}>
                  <p>view order </p>
                </Link>
              </div>
              <div className="grid grid-cols-7 p-1">
                <p>name</p>
                <p>qty.</p>
                <p>amount</p>
                <p>status</p>
                <p>payment</p>
                <p>payment method</p>
                <p>date</p>

                <p>{order.address.firstName}</p>
                <p>
                  <Quantity orderId={order._id} />
                </p>
                <p>
                  {currency}
                  {order.amount}
                </p>
                <p>{order.status}</p>
                <p>{order.payment ? "paid" : "pending"}</p>
                <p>{order.paymentmethod}</p>
                <p>{order.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
