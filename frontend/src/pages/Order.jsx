import React from "react";
import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useParams } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const { currency, token, backendUrl, navigate } = useContext(ShopContext);
  const [orderData, setOrderData] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const orderId = useParams();

  const fetchOrderData = async () => {
    const response = await axios.post(
      backendUrl + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    const data = response.data.orders.filter(
      (order) => order._id === orderId.orderId
    );
    setOrderData(data[0]);
    setItems(data[0].items);
  };

  useEffect(() => {
    if (token) {
      fetchOrderData();
      setLoading(false);
    }
  }, [token]);
  return (
    <div className="flex flex-col">
      <Title text1={"My"} text2={"Order"} />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col">
          <div className="border border-gray-400 bg-gray-100 py-2 px-2 sm:flex sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Order Id : {orderData._id}
              </p>
              <p className="text-sm text-gray-500">
                Order Date : {orderData.date}
              </p>
              <p className="text-sm text-gray-500">
                Status : {orderData.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Payment Method : {orderData.paymentmethod}
              </p>
              <p className="text-sm text-gray-500">
                Payment : {orderData.payment ? "Paid" : "UnPaid"}
              </p>
              <p className="text-sm text-gray-500">
                Amount : {currency}
                {orderData.amount}
              </p>
            </div>
          </div>
          <div>
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between gap-3 my-3 py-2 px-4 bg-gray-100 "
                >
                  <div className="flex gap-3">
                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      <img src={item.image[0]} className="w-18" />
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p>size : {item.size}</p>
                    </div>
                  </div>

                  <div>
                    <p>
                      price : {currency}
                      {item.price}
                    </p>
                    <p>quantity : {item.quantity}</p>
                    <p>
                      amount : {currency}
                      {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
