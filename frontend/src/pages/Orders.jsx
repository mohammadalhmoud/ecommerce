import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

function Orders() {
  const { token, backendUrl, currency, navigate } = useContext(ShopContext);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrders = [];
        response.data.orders.map((order) => {
          allOrders.push(order);
          setOrdersData(allOrders);
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const Quantity = (orderId) => {
    let totalQuantity = 0;
    const orderData = ordersData.filter((item) => item._id === orderId.orderId);
    orderData.map((order) => {
      order.items.map((item) => {
        totalQuantity += item.quantity;
      });
    });
    return <span>{totalQuantity}</span>;
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      <div className="text-xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : ordersData.length === 0 ? (
        <div>No Orders Found</div>
      ) : (
        <div className="flex flex-col-reverse gap-3">
          {/* Render your orders here */}
          {ordersData.map((order, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-[4fr_1fr] border border-gray-300 "
            >
              <div className="sm:border-r sm:border-r-gray-400">
                <div className="flex flex-col sm:flex-row sm:gap-6 bg-gray-100 p-1 mb-2">
                  <p className="text-sm text-gray-400">order : {order._id}</p>
                  <p className="text-sm text-gray-400">date : {order.date}</p>
                </div>

                <div className="flex gap-2 overflow-scroll">
                  {order.items.map((item, index) => {
                    return (
                      <img
                        key={index}
                        className="w-16"
                        src={item.image[0]}
                        alt=""
                      />
                    );
                  })}
                </div>
                <div className="grid grid-flow-col mt-2 px-1 py-1 border-t">
                  <p>
                    amount : {currency}
                    {order.amount}
                  </p>
                  <p>
                    items : <Quantity orderId={order._id} />
                  </p>
                  <p>status : {order.status}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 content-center gap-3 px-8 py-3 sm:px-3">
                <button className="bg-black text-white py-2 px-3">
                  Track Order
                </button>
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="bg-black text-white py-2 px-3"
                >
                  View Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
