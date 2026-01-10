
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to view your orders");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/orders?userId=${user.id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-500">No orders found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-sky-600 mb-6 text-center">My Orders</h2>

      {orders.map((order) => {
     
        const totalPrice = order.items
          ? order.items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
          : order.product?.price || 0;

        const isExpanded = expandedOrderId === order.id;

        return (
          <div
            key={order.id}
            className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition"
          >
           
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-sky-700">
                  Order Id:{order.id}
                </h3>
                <p className="text-gray-500 text-sm">
                  {order.date ? order.date : "Date not available"}
                </p>
                <p className="font-semibold mt-1 text-green-600">
                  Total: ₹{totalPrice.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => toggleDetails(order.id)}
                className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
              >
                {isExpanded ? "Hide Details" : "View Details"}
              </button>
            </div>

       
            {isExpanded && (
              <div className="mt-4 border-t pt-4 space-y-3">
               
                {Array.isArray(order.items) && (
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 border-b pb-2 last:border-none"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-600 text-sm">
                            ₹{item.price ? item.price.toFixed(2) : "N/A"} ×{" "}
                            {item.quantity}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.description || ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                
                {order.product && (
                  <div className="flex items-center gap-4 border-b pb-2">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{order.product.name}</p>
                      <p className="text-gray-600 text-sm">
                        ₹
                        {order.product?.price
                          ? order.product.price.toFixed(2)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>Name:</strong> {order.name || order.customer?.fullName}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {order.address || order.customer?.address}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.phone || order.customer?.phone}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.payment || order.customer?.paymentMethod}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600 font-semibold">
                      {order.status || "Placed"}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
