/* ======================
  table of contents
=========================

  1. Imports
  2. Check if image is an array and has at least one element
*/

//==============
// 1. Imports
//==============
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  //==========================================================
  // Check if image is an array and has at least one element
  // If so, use the first element as the main image
  // Otherwise, set mainImage to an empty string
  //==========================================================
  const mainImage =
    Array.isArray(image) && image.length > 0
      ? image[0].replace("/upload/", "/upload/q_auto,f_auto/")
      : "";

  return (
    <Link className="text-gray-700 cursor-pointer " to={`/product/${id}`}>
      <div className="overflow-hidden h-[450px]">
        <img
          className="w-full h-full object-cover hover:scale-105 transition ease-in-out"
          src={mainImage}
          alt="product image"
          loading="lazy"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {price}
        {currency}
      </p>
    </Link>
  );
}

export default ProductItem;
