/* ======================
  table of contents
=========================

  1. Imports
  2. Fetch Product Data
  3. Handle Loading and Errors
  4. Product Images
  5. Product Info
  6. Select Size
  7. Select Color
  8. Related Products
*/

//==============
// 1. Imports
//==============
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../Components/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const { products, productsLoading, productsError, currency, addToCart } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  //=======================
  // 2. Fetch Product Data
  //=======================
  useEffect(() => {
    if (productId && Array.isArray(products)) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(
          Array.isArray(foundProduct.images) ? foundProduct.images[0] : ""
        );
      }
    }
  }, [productId, products]);

  //================================
  // 3. Handle Loading and Errors
  //================================
  if (productsLoading) return <div>Loading product...</div>;
  if (productsError) return <div>Error loading product.</div>;
  if (!Array.isArray(products)) return <div>No products available.</div>;
  if (!productData)
    return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-12">
        {/*====================
          4. Product Images
        ======================*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {Array.isArray(productData.images) &&
              productData.images.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  alt="Product-Image"
                  className="w-[20%] sm:w-[70%] sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))}
          </div>
          <div className="w-[85%] sm:w-[58%] mx-auto">
            <img src={image} alt="Product-Image" className="w-full h-auto" />
          </div>
        </div>

        {/*==================
          5. Product Info
        ====================*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-5 text-2xl font-medium">
            {productData.price}
            {currency}
          </p>
          <p className="mt-2 font-semibold">
            Status:{" "}
            {productData.stockStatus === "out of stock" ? (
              <span className="text-red-500">Out of Stock</span>
            ) : (
              <span className="text-green-600">In Stock</span>
            )}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/*==================
            6. Select Size
          ===================*/}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(productData.sizes) &&
                productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 ${
                      item === size ? "bg-black text-gray-100" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>

          {/*==================
            7. Select Color
          ===================*/}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Color</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(productData.color) &&
                productData.color.map((item, index) => (
                  <button
                    onClick={() => setColor(item)}
                    className={`border py-2 px-4 ${
                      item === color ? "bg-black text-gray-100" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size, color)}
            disabled={productData.stockStatus === "out of stock"}
            className={`px-8 py-3 text-sm text-white ${
              productData.stockStatus === "out of stock"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black active:bg-gray-700"
            }`}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/*====================
        8. Related Products
      =====================*/}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
}

export default Product;
