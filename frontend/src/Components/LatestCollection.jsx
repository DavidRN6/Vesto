/* ======================
  table of contents
=========================

  1. Imports
  2. Filter the products to get the lastest collection
  3. Rendering Products
*/

//==============
// 1. Imports
//==============
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  //=======================================================
  // 2. Filter the products to get the lastest collection
  //=======================================================
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our newest arrivals featuring the season’s must-have styles.
          Fresh designs, premium quality, and unbeatable prices—crafted to keep
          you on trend.
        </p>
      </div>

      {/*======================
        3. Rendering Products
      =========================*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
