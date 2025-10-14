/* ======================
  table of contents
=========================

  1. Imports
  2. Fetch user orders
  3. Cancel Order Mutation
  4. Cancel popup logic
  5. Loading & Error States
  6. No Orders View & Animation
  7. Order Details
  8. Cancel Order Popup
*/

//==============
// 1. Imports
//==============
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../Components/Title";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import Lottie from "lottie-react";
import cat from "../animations/Loader cat.json";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const queryClient = useQueryClient();

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [cancelReason, setCancelReason] = useState({
    reasons: [],
    otherText: "",
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const reasonsList = [
    "Found a better price",
    "Changed my mind",
    "Ordered by mistake",
    "Shipping takes too long",
    "Other",
  ];

  // =======================
  // 2. Fetch user orders
  // =======================
  const {
    data: orderData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userOrders", token],
    queryFn: async () => {
      if (!token) return [];
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (!response.data.success) throw new Error("Failed to load orders");
      const allOrdersItem = [];
      response.data.orders.forEach((order) => {
        order.items.forEach((item) => {
          item.status = order.status;
          item.date = order.date;
          item.orderId = order._id;
          allOrdersItem.push(item);
        });
      });
      return allOrdersItem.reverse();
    },
    enabled: !!token,
  });

  // ===========================
  // 3. Cancel Order Mutation
  // ===========================
  const cancelMutation = useMutation({
    mutationFn: async ({ orderId, reasonText }) => {
      const response = await axios.post(
        backendUrl + "/api/order/cancel",
        { orderId, cancelReason: reasonText },
        { headers: { token } }
      );
      if (!response.data.success) throw new Error(response.data.message);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      setShowCancelPopup(false);
      queryClient.invalidateQueries(["userOrders", token]);
    },
    onError: (error) => toast.error(error.message),
  });

  // ========================
  // 4. Cancel popup logic
  // ========================
  const toggleReason = (reason) => {
    if (cancelReason.reasons.includes(reason)) {
      setCancelReason((prev) => ({
        ...prev,
        reasons: prev.reasons.filter((r) => r !== reason),
      }));
    } else {
      setCancelReason((prev) => ({
        ...prev,
        reasons: [...prev.reasons, reason],
      }));
    }
  };

  const openCancelPopup = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelPopup(true);
    setCancelReason({ reasons: [], otherText: "" });
  };

  const submitCancel = () => {
    const reasonText = cancelReason.reasons.includes("Other")
      ? cancelReason.otherText.trim()
      : cancelReason.reasons.join(", ");
    if (!reasonText) {
      toast.error("Please provide a reason for cancellation");
      return;
    }
    cancelMutation.mutate({ orderId: selectedOrderId, reasonText });
  };

  //============================
  // 5. Loading & Error States
  //============================
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Lottie className="h-[270px] sm:h-[375px]" animationData={cat} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load orders.
      </div>
    );
  }

  return (
    <div className="border-t lg:py-14">
      {orderData.length === 0 ? (
        //=================================
        // 6. No Orders View & Animation
        //=================================
        <div className="flex flex-col-reverse lg:flex-row items-center text-center justify-around mt-10 gap-16">
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-gray-700 text-3xl">
              You have no orders yet
            </p>
            <p className="text-center text-gray-700 mb-5 text-3xl">
              Order now and enjoy our products!
            </p>
            <Link to="/collection">
              <button className="py-3 px-6 text-base border cursor-pointer bg-black text-white transition-all">
                Order Now
              </button>
            </Link>
          </div>
          <div>
            <Lottie className="h-[270px] sm:h-[375px]" animationData={cat} />
          </div>
        </div>
      ) : (
        <>
          <div className="text-2xl">
            <Title text1="MY" text2="ORDERS" />
          </div>

          {/*==================
            7. Order Details
          =====================*/}
          <div>
            {orderData.map((item, index) => (
              <div
                key={index}
                className="py-4 border-b border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img
                    className="w-24 sm:w-[100px]"
                    src={item.images[0]}
                    alt="product-img"
                  />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-6 mt-2 text-base text-gray-700">
                      <p>
                        {item.price}
                        {currency}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-6 mb-2 mt-1 text-base text-gray-700">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>
                    <p>
                      Date:{" "}
                      <span className="text-gray-400">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                    Track Order
                  </button>

                  {item.status === "Order Placed" && (
                    <button
                      onClick={() => openCancelPopup(item.orderId)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/*=======================
            8. Cancel Order Popup
          =========================*/}
          {showCancelPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative">
                <button
                  onClick={() => setShowCancelPopup(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold transition-all duration-200"
                  aria-label="Close Cancel Popup"
                >
                  <IoClose />
                </button>
                <h3 className="text-xl font-semibold mb-4">
                  Why do you want to cancel?
                </h3>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto mb-4">
                  {reasonsList.map((reason) => (
                    <label key={reason} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={cancelReason.reasons.includes(reason)}
                        onChange={() => toggleReason(reason)}
                      />
                      {reason}
                    </label>
                  ))}
                </div>
                {cancelReason.reasons.includes("Other") && (
                  <input
                    type="text"
                    placeholder="Write your reason"
                    value={cancelReason.otherText}
                    onChange={(e) =>
                      setCancelReason((prev) => ({
                        ...prev,
                        otherText: e.target.value,
                      }))
                    }
                    className="border p-2 w-full mb-4"
                  />
                )}
                <button
                  onClick={submitCancel}
                  disabled={
                    cancelReason.reasons.length === 0 ||
                    (cancelReason.reasons.includes("Other") &&
                      cancelReason.otherText.trim() === "")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Submit Cancellation
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;

//==============================
//  Copy Without TanStack Query
//==============================

// /* ======================
//   table of contents
// =========================

//   1. Imports
//   2. Fetching the order data
//   3. Order data map
//   4. Cancel Order Popup and Logic
// */

// //==============
// // 1. Imports
// //==============
// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../Components/Title";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { IoClose } from "react-icons/io5";
// import { Link } from "react-router";
// import Lottie from "lottie-react";
// import cat from "../animations/Loader cat.json";

// function Orders() {
//   const { backendUrl, token, currency } = useContext(ShopContext);

//   const [orderData, setOrderData] = useState([]);

//   const [showCancelPopup, setShowCancelPopup] = useState(false);
//   const [cancelReason, setCancelReason] = useState({
//     reasons: [],
//     otherText: "",
//   });
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   const reasonsList = [
//     "Found a better price",
//     "Changed my mind",
//     "Ordered by mistake",
//     "Shipping takes too long",
//     "Other",
//   ];

//   //==============================
//   // 2. Fetching the order data
//   //==============================
//   const loadOrderData = async () => {
//     try {
//       if (!token) return null;

//       const response = await axios.post(
//         backendUrl + "/api/order/userorders",
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.forEach((order) => {
//           order.items.forEach((item) => {
//             item.status = order.status;
//             item.date = order.date;
//             item.orderId = order._id; // مهم عشان نعرف أي أوردر نلغيه
//             allOrdersItem.push(item);
//           });
//         });
//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   // ===== التحكم في اختيار سبب الإلغاء =====
//   const toggleReason = (reason) => {
//     if (cancelReason.reasons.includes(reason)) {
//       setCancelReason((prev) => ({
//         ...prev,
//         reasons: prev.reasons.filter((r) => r !== reason),
//       }));
//     } else {
//       setCancelReason((prev) => ({
//         ...prev,
//         reasons: [...prev.reasons, reason],
//       }));
//     }
//   };

//   // ===== فتح البوب اب وتحديد الأوردر =====
//   const openCancelPopup = (orderId) => {
//     setSelectedOrderId(orderId);
//     setShowCancelPopup(true);
//     setCancelReason({ reasons: [], otherText: "" });
//   };

//   // ===== إرسال سبب الإلغاء للباك اند =====
//   const submitCancel = async () => {
//     const reasonText = cancelReason.reasons.includes("Other")
//       ? cancelReason.otherText.trim()
//       : cancelReason.reasons.join(", ");

//     if (!reasonText) {
//       toast.error("Please provide a reason for cancellation");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         backendUrl + "/api/order/cancel",
//         { orderId: selectedOrderId, cancelReason: reasonText },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success("Order cancelled successfully");
//         setShowCancelPopup(false);
//         loadOrderData();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="border-t lg:py-14">
//       {orderData.length === 0 ? (
//         <>
//           <div className="flex flex-col-reverse lg:flex-row items-center text-center justify-around mt-10 gap-16">
//             <div className="flex flex-col items-center gap-4">
//               <p className="text-center text-gray-700 text-3xl">
//                 You have no orders yet
//               </p>
//               <p className="text-center text-gray-700 mb-5 text-3xl">
//                 Order now and enjoy our products!
//               </p>
//               <Link to="/collection">
//                 <button className="py-3 px-6 text-base border cursor-pointer bg-black text-white transition-all">
//                   Order Now
//                 </button>
//               </Link>
//             </div>
//             <div>
//               <Lottie className="h-[270px] sm:h-[375px]" animationData={cat} />
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="text-2xl">
//             <Title text1="MY" text2="ORDERS" />
//           </div>

//           <div>
//             {/*==================
//           3. Order data map
//         =====================*/}
//             {orderData.map((item, index) => (
//               <div
//                 key={index}
//                 className="py-4 border-b border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//               >
//                 <div className="flex items-start gap-6 text-sm">
//                   <img
//                     className="w-24 sm:w-[100px]"
//                     src={item.images[0]}
//                     alt="product-img"
//                   />
//                   <div>
//                     <p className="sm:text-base font-medium">{item.name}</p>
//                     <div className="flex items-center gap-6 mt-2 text-base text-gray-700">
//                       <p>
//                         {item.price}
//                         {currency}
//                       </p>
//                       <p>Quantity: {item.quantity}</p>
//                     </div>
//                     <div className="flex items-center gap-6 mb-2 mt-1 text-base text-gray-700">
//                       <p>Size: {item.size}</p>
//                       <p>Color: {item.color}</p>
//                     </div>
//                     <p>
//                       Date:{" "}
//                       <span className="text-gray-400">
//                         {new Date(item.date).toDateString()}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="md:w-1/2 flex justify-between items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//                     <p className="text-sm md:text-base">{item.status}</p>
//                   </div>
//                   <button
//                     onClick={loadOrderData}
//                     className="border px-4 py-2 text-sm font-medium rounded-sm"
//                   >
//                     Track Order
//                   </button>

//                   {/* زرار Cancel Order يظهر بس لو الحالة Order Placed */}
//                   {item.status === "Order Placed" && (
//                     <button
//                       onClick={() => openCancelPopup(item.orderId)}
//                       className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//                     >
//                       Cancel Order
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/*====================
//         4. Cancel Order Popup
//       ======================*/}
//           {showCancelPopup && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//               <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative">
//                 <button
//                   onClick={() => setShowCancelPopup(false)}
//                   className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold transition-all duration-200"
//                   aria-label="Close Cancel Popup"
//                 >
//                   <IoClose />
//                 </button>
//                 <h3 className="text-xl font-semibold mb-4">
//                   Why do you want to cancel?
//                 </h3>
//                 <div className="flex flex-col gap-2 max-h-48 overflow-y-auto mb-4">
//                   {reasonsList.map((reason) => (
//                     <label key={reason} className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={cancelReason.reasons.includes(reason)}
//                         onChange={() => toggleReason(reason)}
//                       />
//                       {reason}
//                     </label>
//                   ))}
//                 </div>
//                 {cancelReason.reasons.includes("Other") && (
//                   <input
//                     type="text"
//                     placeholder="Write your reason"
//                     value={cancelReason.otherText}
//                     onChange={(e) =>
//                       setCancelReason((prev) => ({
//                         ...prev,
//                         otherText: e.target.value,
//                       }))
//                     }
//                     className="border p-2 w-full mb-4"
//                   />
//                 )}
//                 <button
//                   onClick={submitCancel}
//                   disabled={
//                     cancelReason.reasons.length === 0 ||
//                     (cancelReason.reasons.includes("Other") &&
//                       cancelReason.otherText.trim() === "")
//                   }
//                   className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
//                 >
//                   Submit Cancellation
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default Orders;
