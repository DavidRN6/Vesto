/* ======================
  table of contents
=========================

  1. Imports
  2. Add To Cart
  3. Get Cart Count
  4. Update Cart Quantity
  5. Get Cart Total Amount
  6. Get Products Data
  7. Get User Cart
  8. UseEffects
*/

//==============
// 1. Imports
//==============
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "EGP";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true); // 🆕 حالة تحميل
  const navigate = useNavigate();

  //=================
  // 2. Add To Cart
  //=================
  const addToCart = async (itemId, size, color) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (!color) {
      toast.error("Select Product Color");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    if (!cartData[itemId][size]) {
      cartData[itemId][size] = {};
    }
    if (cartData[itemId][size][color]) {
      cartData[itemId][size][color] += 1;
    } else {
      cartData[itemId][size][color] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size, color },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    toast.success("Product Added to Cart");
  };

  //====================
  // 3. Get Cart Count
  //====================
  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          if (cartItems[itemId][size][color] > 0) {
            totalCount += cartItems[itemId][size][color];
          }
        }
      }
    }

    return totalCount;
  };

  //==========================
  // 4. Update Cart Quantity
  //==========================
  const updateQuantity = async (itemId, size, color, quantity) => {
    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    if (!cartData[itemId][size]) {
      cartData[itemId][size] = {};
    }

    cartData[itemId][size][color] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, color, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  //===========================
  // 5. Get Cart Total Amount
  //===========================
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);

      if (!itemInfo) {
        continue;
      }

      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          try {
            if (cartItems[itemId][size][color] > 0) {
              totalAmount += cartItems[itemId][size][color] * itemInfo.price;
            }
          } catch (error) {
            console.error("Error calculating total amount:", error);
          }
        }
      }
    }
    return totalAmount;
  };

  //======================
  // 6. Get Products Data
  //======================
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
        setLoading(false); // 🆕 إيقاف التحميل
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  //=====================
  // 7. Get User Cart
  //=====================
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //=====================
  // 8. UseEffects
  //=====================
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    loading, // 🆕 نمرر حالة التحميل للفرونت
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
