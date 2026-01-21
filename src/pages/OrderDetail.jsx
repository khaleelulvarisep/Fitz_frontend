import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`orders/${id}/`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-sky-700">
        Order #{order.id}
      </h2>

      <div className="mb-4">
        <p><b>Name:</b> {order.full_name}</p>
        <p><b>Phone:</b> {order.phone}</p>
        <p><b>Address:</b> {order.address}, {order.city}</p>
        <p><b>Payment:</b> {order.payment_status}</p>
        <p><b>Order:</b> {order.status}</p>
      </div>

      <h3 className="text-xl font-semibold mb-3">Items</h3>

      {order.items.map((item) => (
        <div key={item.id} className="flex gap-4 mb-3 border p-3 rounded">
          <img src={item.image} alt="" className="w-20 h-20 object-cover" />
          <div>
            <p className="font-semibold">{item.product_name}</p>
            <p>Qty: {item.quantity}</p>
            <p>₹{item.price}</p>
          </div>
        </div>
      ))}

      <h3 className="text-right text-xl font-bold mt-4">
        Total: ₹{order.total_amount}
      </h3>
    </div>
  );
}

export default OrderDetail;
