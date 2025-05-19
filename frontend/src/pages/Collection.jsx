import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
function Collection() {
  const { products, search, viewSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sort, setSort] = useState("relavent");
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = [...products];
    if (viewSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    return productsCopy;
  };
  {
    /*Sort Products*/
  }

  const sortProduct = (productsToSort) => {
    let fpCopy = productsToSort.slice();
    switch (sort) {
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      default:
        setFilterProducts(fpCopy);
        break;
    }
  };
  useEffect(() => {
    const filtred = applyFilters();
    sortProduct(filtred);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory, search, viewSearch, products]);
  useEffect(() => {
    const filtred = applyFilters();
    sortProduct(filtred);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

 

  return (
    <div
      className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t "
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="min-w-60 sm:sticky sm:top-0 ">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 "
        >
          FILTERS
          <img
            className={`h-3 sm:hidden  ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
          />
        </p>
        {/*Category Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } ${!showFilter ? "sm:block" : ""}`}
        >
          <p className="mb-3 text-sm font-medium ">Categories</p>
          <div className="flex flex-col text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/*Type Filters*/}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } ${!showFilter ? "sm:block" : ""}`}
        >
          <p className="mb-3 text-sm font-medium ">Type</p>
          <div className="flex flex-col text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Top Wear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottom Wear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winter Wear
            </p>
          </div>
        </div>
      </div>
      {/*right side*/}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collection"} />
          <select
            onChange={(e) => setSort(e.target.value)}
            className="text-sm px-2 border-2 border-gray-300"
          >
            <option value="relavent">relavent</option>
            <option value="low-high">sort by : low to high</option>
            <option value="high-low">sort by : high to low</option>
          </select>
        </div>
        {/*Map Products*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
