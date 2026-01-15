import React, { useContext, useState } from "react";
import api from "../api/axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Checkout() {
  const { cart } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const res = await api.post("orders/create/", {
        ...form,
        payment_method: paymentMethod,
      });

      // 👉 COD
      if (paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        return;
      }

      // 👉 Razorpay
      const options = {
        key: res.data.key,
        amount: res.data.amount * 100,
        currency: "INR",
        name: "FiTz.",
        order_id: res.data.razorpay_order_id,
        handler: async (response) => {
          await api.post("orders/verify/", response);
          toast.success("Payment successful!");
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* SHIPPING FORM */}
      <input
        name="full_name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="state"
        placeholder="State"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="pincode"
        placeholder="Pincode"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="notes"
        placeholder="Order Notes (optional)"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      {/* PAYMENT */}
      <div className="mb-4">
        <label>
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />{" "}
          Cash on Delivery
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />{" "}
          Online Payment
        </label>
      </div>

      <p className="font-semibold mb-4">Total: ₹{total}</p>

      <button
        onClick={placeOrder}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
