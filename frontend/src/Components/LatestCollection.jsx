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
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import loadingSpinner from "../animations/Spinner.json";
import Lottie from "lottie-react";

function LatestCollection() {
  const { products, productsLoading, productsError } = useContext(ShopContext);

  const latestProducts = Array.isArray(products) ? products.slice(0, 10) : [];

  //=====================
  // Handling loading
  //=====================
  if (productsLoading)
    return (
      <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Explore our newest arrivals featuring the season’s must-have styles.
            Fresh designs, premium quality, and unbeatable prices—crafted to
            keep you on trend.
          </p>
        </div>
        <div className="text-center py-10">
          <Lottie className="h-[75px]" animationData={loadingSpinner} />
        </div>
      </div>
    );

  //===================
  // Handling errors
  //===================
  if (productsError)
    return (
      <p className="text-center py-10 text-red-500">Error loading products.</p>
    );

  //=======================
  // Handling no products
  //=======================
  if (!products || products.length === 0)
    return (
      <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Explore our newest arrivals featuring the season’s must-have styles.
            Fresh designs, premium quality, and unbeatable prices—crafted to
            keep you on trend.
          </p>
        </div>

        <p className="text-center py-10">No products found.</p>
      </div>
    );

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
