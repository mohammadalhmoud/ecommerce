import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add.jsx";
import Orders from "./pages/Orders";
import List from "./pages/List";
import { useState } from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Order from "./pages/Order.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = import.meta.env.VITE_CURRENCY;

function App() {
  const [token, setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token") : "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div>
          <NavBar setToken={setToken}/>
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/order/:id" element={<Order token={token} />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
