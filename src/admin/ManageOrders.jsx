
import React, { useContext, useState } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import api from "../api/axios";

function ManageOrders() {
  const { orders, users, loading, handleStatusChange } = useContext(AdminContext);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Update order status using Axios (string-safe)
  // const handleStatusChange = async (id, newStatus) => {
    
  //      try {
  //   await api.patch(`admin/orders/${id}/status/`, {
  //     status: newStatus,
  //   });
  //   toast.success("Order status updated");
  //   fetchAllData(); // refresh list
  // } catch (err) {
  //   toast.error("Failed to update status");
  // }
  // };

  const closeModal = () => setSelectedOrder(null);

  if (loading) return <h2 className="text-center mt-10 text-lg">Loading orders...</h2>;
  if (!orders || orders.length === 0)
    return <p className="text-center text-sky-500">No orders found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl text-sky-800 mb-6 text-center">Manage Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => {
          const user = users.find((u) => u.id.toString() === order.user.toString());
          return (
            <div
              key={order.id}
              className="border rounded-xl shadow p-5 bg-white hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status.toLowerCase() === "placed"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status.toLowerCase() === "shipped"
                      ? "bg-blue-200 text-blue-800"
                      : order.status.toLowerCase() === "delivered"
                      ? "bg-green-200 text-green-800"
                      : order.status === "CANCELLED"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-700">
                <p><strong>User:</strong> {user?.name || "Unknown"}</p>
                <p><strong>Email:</strong> {user?.email || "N/A"}</p>
                <p><strong>Payment:</strong> {order.payment_method || order.payment || "N/A"}</p>
                <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <label className="text-sm font-semibold mr-2">Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="PLACED">Placed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-2xl relative shadow-xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            {(() => {
              const user = users.find(
                (u) => u.id.toString() === selectedOrder.user.toString()
              );
              return (
                <>
                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                    <p><strong>User Name:</strong> {user?.name || "Unknown"}</p>
                    <p><strong>Email:</strong> {user?.email || "N/A"}</p>
                    <p><strong>Address:</strong> {selectedOrder.address || "N/A"}</p>
                    <p><strong>Payment Method:</strong> {selectedOrder.payment_method || selectedOrder.payment || "N/A"}</p>
                    <p><strong>Status:</strong> {selectedOrder.payment_status|| "N/A"}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                  </div>
                  

                  <div className="border-t pt-3">
                    <h3 className="font-semibold mb-2">Items:</h3>
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex gap-3 mb-3 items-center border-b pb-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold">{item.product_name}</p>
                            <p>₹{item.price} × {item.quantity}</p>
                            {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No items found</p>
                    )}
                  </div>

                  {selectedOrder.total_amount && (
                    <p className="mt-3 font-bold text-lg text-right">Total: ₹{selectedOrder.total_amount}</p>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOrders;





