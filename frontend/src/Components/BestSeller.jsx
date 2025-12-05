/* ======================
  table of contents
=========================

  1. Imports
  2. Filter the products to get the best sellers
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

function BestSeller() {
  const { products, productsLoading, productsError } = useContext(ShopContext);

  //=================================================
  // 2. Filter the products to get the best sellers
  //=================================================
  const bestSeller = Array.isArray(products)
    ? products.filter((item) => item.bestseller).slice(0, 5)
    : [];

  //=====================
  // Handling loading
  //=====================
  if (productsLoading)
    return (
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Title text1={"BEST"} text2={"SELLERS"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Discover our most-loved pieces that customers can’t get enough of.
            Shop the best-selling styles that define comfort, quality, and
            timeless fashion.
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
        <div className="text-center text-3xl py-8">
          <Title text1={"BEST"} text2={"SELLERS"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Discover our most-loved pieces that customers can’t get enough of.
            Shop the best-selling styles that define comfort, quality, and
            timeless fashion.
          </p>
        </div>

        <p className="text-center py-10">No products found.</p>
      </div>
    );

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our most-loved pieces that customers can’t get enough of.
          Shop the best-selling styles that define comfort, quality, and
          timeless fashion.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
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

export default BestSeller;
