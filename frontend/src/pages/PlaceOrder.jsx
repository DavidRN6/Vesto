/* ======================
  table of contents
=========================

  1. Imports
  2. Product Order and Details
  3. APIS order place
  4. Left Side
  5. Inputs
  6. Right Side
*/

//==============
// 1. Imports
//==============
import { useContext, useState } from "react";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../context/ShopContext";
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
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  //================================
  //  2. Product Order and Details
  //================================
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        const sizes = cartItems[itemId];
        for (const size in sizes) {
          const colors = sizes[size];
          for (const color in colors) {
            const quantity = colors[color];
            if (quantity > 0) {
              const itemInfo = structuredClone(
                products.find((product) => product._id === itemId)
              );
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

      //=======================
      // 3. APIS order place
      //=======================
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-around gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/*==============
        4. Left Side
      ===============*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {/*============
          5. Inputs
        ==============*/}
        <input
          onChange={onChangeHandler}
          name="fullName"
          value={formData.fullName}
          required
          type="text"
          placeholder="Full Name"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <textarea
          onChange={onChangeHandler}
          name="additionalInfo"
          value={formData.additionalInfo}
          autoComplete="off"
          className="border-gray-400 hover:border-gray-700 transition duration-300 border rounded-[4px] w-full h-40"
          placeholder="Any Additional Information"
        ></textarea>
      </div>

      {/*===============
        6. Right Side
      ==================*/}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white text-sm px-16 py-3"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
