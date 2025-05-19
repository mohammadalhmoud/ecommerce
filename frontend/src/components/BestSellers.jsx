import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function BestSellers() {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(1, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          discover our best sellers
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((item, index) => {
          return (
            <ProductItem
              key={index}
              image={item.image}
              price={item.price}
              id={item._id}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BestSellers;
