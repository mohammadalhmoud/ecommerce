import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
function RelatedProducts({ category, subcategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => item.category == category);

      productsCopy = productsCopy.filter(
        (item) => item.subCategory == subcategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="flex flex-col">
      <div className="text-center text-2xl mt-2">
        <Title text1={"Related"} text2={"Products"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            name={item.name}
            image={item.image}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
