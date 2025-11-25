/* ======================
  table of contents
=========================

  1. Imports
  2. Fetch Products with TanStack Query
  3. Add To Cart
  4. Get Cart Count
  5. Update Cart Quantity
  6. Get Cart Total Amount
  7. Get User Cart
  8. Token & Initial Load
*/

//==============
// 1. Imports
//==============
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "EGP";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  //========================================
  // 2. Fetch Products with TanStack Query
  //========================================
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      return response.data.products;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  //=================
  // 3. Add To Cart
  //=================
  const addToCartMutation = useMutation({
    mutationFn: async ({ itemId, size, color }) => {
      if (!size) {
        toast.error("Select Product Size");
        throw new Error("No size");
      }
      if (!color) {
        toast.error("Select Product Color");
        throw new Error("No color");
      }

      let cartData = structuredClone(cartItems);
      if (!cartData[itemId]) cartData[itemId] = {};
      if (!cartData[itemId][size]) cartData[itemId][size] = {};
      if (cartData[itemId][size][color]) {
        cartData[itemId][size][color] += 1;
      } else {
        cartData[itemId][size][color] = 1;
      }
      setCartItems(cartData);

      if (token) {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size, color },
          { headers: { token } }
        );
      }

      return true;
    },

    onSuccess: () => {
      toast.success("Product Added to Cart");
    },
  });

  const addToCart = (itemId, size, color) => {
    addToCartMutation.mutate({ itemId, size, color });
  };

  //=====================
  // 4. Get Cart Count
  //=====================
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          totalCount += cartItems[itemId][size][color];
        }
      }
    }
    return totalCount;
  };

  //===========================
  // 5. Update Cart Quantity
  //===========================
  const updateQuantity = async (itemId, size, color, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = {};
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

  //============================
  // 6. Get Cart Total Amount
  //============================
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue;
      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          totalAmount += cartItems[itemId][size][color] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  //====================
  // 7. Get User Cart
  //====================
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) setCartItems(response.data.cartData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //===========================
  // 8. Token & Initial Load
  //===========================
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    productsLoading,
    productsError,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    addToCartPending: addToCartMutation.isPending,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
