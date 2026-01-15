import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("orders/")
      .then((res) => setOrders(res.data))
      .catch(() => navigate("/login"));
  }, []);

  if (orders.length === 0) {
    return <p className="text-center mt-10">No orders found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-sky-700">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 mb-4 shadow cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/orders/${order.id}`)}
        >
          <div className="flex justify-between">
            <p className="font-semibold">Order #{order.id}</p>
            <p className="text-green-600">₹{order.total_amount}</p>
          </div>

          <p className="text-sm text-gray-600">
            {new Date(order.created_at).toLocaleDateString()}
          </p>

          <p className="text-sm">
            Payment:{" "}
            <span className="font-medium">{order.payment_status}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
