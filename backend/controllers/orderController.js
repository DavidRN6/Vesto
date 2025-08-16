import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, Information } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      Information,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order Data For Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete Order From Admin Panel
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel Order by User
const cancelOrder = async (req, res) => {
  try {
    const { orderId, cancelReason } = req.body;

    // لازم نتأكد إن حالة الطلب حاليا "Order Placed" عشان يسمح بالإلغاء
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    if (order.status !== "Order Placed") {
      return res.json({
        success: false,
        message: "Cannot cancel order at this stage",
      });
    }

    // تحديث حالة الطلب وسبب الإلغاء
    order.status = "Cancelled";
    order.cancelReason = cancelReason;

    // لو عايز تمسح بيانات العناصر (اختياري)
    order.items = [];
    order.amount = 0;

    await order.save();

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  deleteOrder,
  cancelOrder,
};
