import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");


  useEffect(() => {
    if (products.length > 0 && productId) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0]);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
      }
    }
  }, [products, productId]);
  

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*product Data*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*Product Image*/}
        <div className="flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt=""
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/*-----------------------------Product Info----------------------------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 ">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border bg-gray-100 py-2 px-4 cursor-pointer ${
                    item == size ? "border-2 border-amber-600" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-800"
          >
            Add To Cart
          </button>
          <hr className="mt-3 sm:w-4/5" />
          <div className="text-gray-500 text-sm flex flex-col gap1 mt-5">
            <p>100% Original brand </p>
            <p>Cash on delivery availabel on this product</p>
            <p>Easy return and exchange policy with in 7 days</p>
          </div>
        </div>
      </div>
      {/*-------------------Description and Reviews-----------------*/}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm ">Description</b>
          <p className="border px-5 py-3 text-sm ">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            quibusdam repellat saepe dolorum est perferendis vel itaque soluta
            voluptas deserunt? Odio facere esse ipsam obcaecati, assumenda quo
            magni totam. Exercitationem.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
            nostrum quidem soluta labore itaque nisi? Voluptas pariatur nostrum
            ex, libero perferendis atque ratione ipsum ipsam, adipisci
            reprehenderit sapiente necessitatibus consectetur!
          </p>
        </div>
      </div>
      {/*---------------------display related Products---------------*/}
      <RelatedProducts
        category={productData.category}
        subcategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
