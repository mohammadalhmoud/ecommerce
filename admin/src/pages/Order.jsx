import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../App";
import { currency } from "../App";

const Order = ({ token }) => {
  const id = useParams();
  const [order, setOrder] = useState(null);
  const fetchOrder = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/orders",
        {},
        { headers: { token } }
      );
      const orderData = response.data.orders.find((o) => o._id === id.id);
      setOrder(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (e) => {
    console.log(e);

    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { id: id.id, status: e },
        { headers: { token } }
      );
      if (response.data.success) {
        setOrder(response.data.order);
        fetchOrder()
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [token]);

  return (
    <div className="flex flex-col gap-3">
      {!order ? (
        "Loading..."
      ) : (
        <div>
          <div className="flex justify-between p-2 ">
            <p>Order Detailes</p>
            <select
              onChange={(e) => handleStatus(e.target.value)}
              defaultValue={order.status}
              className="p-1 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Delivery">Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="flex justify-between bg-gray-100 border border-gray-300 mb-2">
            <div className="text-gray-400 flex flex-col p-1">
              <p>Date : {order.date}</p>
              <p>Payment Method : {order.paymentmethod}</p>
              <p>Payment : {order.payment ? "Paid" : "Pending"}</p>
              <p>Status : {order.status}</p>
              <p>
                Amount : {currency}
                {order.amount}
              </p>
            </div>

            <div className="flex flex-col p-1 text-gray-400 overflow-x-scroll">
              <p>
                Name : {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                Country : {order.address.country} / City : {order.address.city}
              </p>
              <p>Phone : {order.address.phone}</p>
              <p>Email : {order.address.email}</p>
            </div>
          </div>
          <p className="overflow-x-scroll bg-gray-100 text-gray-400 mb-2 p-2">
            Street : {order.address.street}
          </p>
          {order.items.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col mb-2 border border-gray-300"
              >
                <div className="bg-gray-200">
                  <p className="text-gray-400 p-1">ID : {item._id}</p>
                </div>
                <div className="flex gap-3 p-1">
                  <div className="w-18">
                    <img src={item.image[0]} />
                  </div>

                  <div className="flex justify-between px-2 py-1 w-full items-center">
                    <div className="flex flex-col">
                      <p>{item.name}</p>
                      <p>size : {item.size}</p>
                      <p>quantity : {item.quantity}</p>
                    </div>

                    <p>
                      Price :{currency}
                      {item.price}
                    </p>

                    <p>
                      amount : {currency}
                      {item.quantity * item.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
