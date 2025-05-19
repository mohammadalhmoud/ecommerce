import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

function Search() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search, setSearch, viewSearch, setViewSearch } = useContext(ShopContext);
  const [visible,setVisible] = useState(false)
  const location = useLocation();
  useEffect(() => {
    const isCollectionPage = location.pathname.toLowerCase().includes("collection");
    setVisible(isCollectionPage);

    if (!isCollectionPage) {
      setViewSearch(false);
    }
  }, [location]);
  return viewSearch && visible ? (
    <div className="flex justify-center items-center bg-gray-100 py-2">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="inline-flex justify-center border border-gray-300 pl-4 w-100  py-2 rounded-3xl bg-white"
      />
      <img onClick={()=>setViewSearch(false)} src={assets.cross_icon} className="w-5 pl-2 cursor-pointer" />
    </div>
  ) : null;
}

export default Search;
