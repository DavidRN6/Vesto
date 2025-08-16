/* ======================
  table of contents
=========================

  1. Imports
*/

//==============
// 1. Imports
//==============
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../Components/Title";
import { FaRegTrashAlt } from "react-icons/fa";
import CartTotal from "../Components/CartTotal";
import Lottie from "lottie-react";
import emptyCartAnimation from "../animations/empty cart.json";
import { Link } from "react-router";

function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length === 0) return;

    // إذا كانت المنتجات فارغة، لا نقوم بأي شيء
    // إذا كانت المنتجات غير فارغة، نقوم بتحديث بيانات السلة
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          if (cartItems[itemId][size][color] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              color: color,
              quantity: cartItems[itemId][size][color],
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t lg:py-14">
      {cartData.length === 0 ? (
        <>
          <div className="flex flex-col-reverse lg:flex-row items-center text-center justify-around mt-10 gap-16">
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-gray-700 text-3xl">
                Your cart is empty now
              </p>
              <p className="text-center text-gray-700 mb-5 text-3xl">
                Thank you for Choosing us!
              </p>
              <Link to="/collection" >
                <button className="py-3 px-6 text-base border cursor-pointer bg-black text-white transition-all">
                  Shop Now
                </button>
              </Link>
            </div>
            <div>
              <Lottie
                className="h-[270px] sm:h-[375px]"
                animationData={emptyCartAnimation}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl mb-3">
            <Title text1={"YOUR"} text2={"CART"} />
          </div>

          <div>
            {cartData.map((item, index) => {
              const productData = products.find(
                (Product) => Product._id === item._id
              );

              if (!productData) {
                return <p key={index}>Loading...</p>;
              }

              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 items-center gap-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]"
                >
                  <div className="flex items-start gap-1 sm:gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productData.images[0]}
                      alt="product image"
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-1 sm:gap-5 mt-2">
                        <p>
                          {productData.price}
                          {currency}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item.size}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item.color}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            item.color,
                            Number(e.target.value)
                          )
                    }
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  <FaRegTrashAlt
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.color, 0)
                    }
                    className="text-lg mr-4 sm:text-xl cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end mt-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm my-8 px-8 py-3"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
