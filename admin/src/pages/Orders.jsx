/* ======================
  table of contents
=========================

  1. Imports
  2. Fetch all orders from the backend
  3. order status update
  4. Delete Popup
  5. Delete after press yes
  6. Order Status / Cancelled Info
  7. Delete Button
  8. Are you Sure
*/

//==============
// 1. Imports
//==============
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { FaBoxOpen } from "react-icons/fa";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  //========================================
  // 2. Fetch all orders from the backend
  //========================================
  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //=========================
  // 3. order status update
  //=========================
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  //==================
  // 4. Delete Popup
  //==================
  const confirmDelete = (orderId) => {
    setSelectedOrderId(orderId);
    setShowConfirm(true);
  };

  //============================
  // 5. Delete after press yes
  //============================
  const handleConfirm = async (confirm) => {
    if (confirm && selectedOrderId) {
      try {
        const response = await axios.post(
          backendUrl + "/api/order/delete",
          { orderId: selectedOrderId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Order deleted successfully");
          fetchAllOrders();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
    setShowConfirm(false);
    setSelectedOrderId(null);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-t-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <FaBoxOpen className="text-6xl" />
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className="py-0.5" key={idx}>
                    {item.name} x {item.quantity} <span>{item.size}</span>{" "}
                    <span>{item.color}</span>
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.fullName}</p>
              <p>{order.address.email}</p>
              <p className="py-1">{order.address.phone}</p>
              <p>{order.address.additionalInfo}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">
                Date : {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>

            {/*=================================
              6. Order Status / Cancelled Info
            ====================================*/}
            <div className="flex flex-col">
              {order.status === "Cancelled" ? (
                <>
                  <p className="text-red-600 font-bold text-lg">
                    Order Cancelled
                  </p>
                  {order.cancelReason && (
                    <p className="text-sm text-gray-600">
                      Reason: {order.cancelReason}
                    </p>
                  )}
                </>
              ) : (
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="p-2 font-semibold"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Ready For Delivery">Ready For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </div>

            {/*==================
              7. Delete Button
            =====================*/}
            <button
              onClick={() => confirmDelete(order._id)}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/*=================
        8. Are you Sure
      ====================*/}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center mx-5 sm:mx-0">
            <p className="text-lg font-medium mb-4">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleConfirm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
