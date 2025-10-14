/* ======================
  table of contents
=========================

  1. Imports
  2. Mutation with TanStack Query
  3. On Submit Handler
  4. Left Side
  5. Right Side
*/

//==============
// 1. Imports
//==============
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //==================================
  // 2. Mutation with TanStack Query
  //==================================
  const placeOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        {
          headers: { token },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success("Order placed successfully!");
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //========================
  // 3. On Submit Handler
  //========================
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const orderItems = [];

    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];
      for (const size in sizes) {
        const colors = sizes[size];
        for (const color in colors) {
          const quantity = colors[color];
          if (quantity > 0) {
            const itemInfo = { ...products.find((p) => p._id === itemId) };
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.color = color;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }
    }

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };

    placeOrderMutation.mutate(orderData);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-around gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/*===============
        4. Left Side
      ================*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <input
          name="fullName"
          value={formData.fullName}
          onChange={onChangeHandler}
          required
          type="text"
          placeholder="Full Name"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          required
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          required
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={onChangeHandler}
          autoComplete="off"
          className="border-gray-400 hover:border-gray-700 transition duration-300 border rounded-[4px] w-full h-40"
          placeholder="Any Additional Information"
        ></textarea>
      </div>

      {/*================
        5. Right Side
      =================*/}
      <div className="mt-8 w-full sm:w-[450px]">
        <CartTotal />
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white text-sm px-16 py-3"
            disabled={placeOrderMutation.isLoading}
          >
            {placeOrderMutation.isLoading ? "Placing..." : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
