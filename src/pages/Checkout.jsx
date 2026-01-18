

import React, { useContext, useState } from "react";
import api from "../api/axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const { cart } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  //  If product exists → Buy Now
  const buyNowProduct = location.state?.product || null;

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Calculate total
  const total = buyNowProduct
    ? buyNowProduct.price
    : cart?.items?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

  const placeOrder = async () => {
    try {
      const payload = {
        ...form,

        payment_method: paymentMethod,
      };

      // 🔹 If Buy Now → send product_id
      if (buyNowProduct) {
        payload.product_id = buyNowProduct.id;
        payload.quantity = 1;
      }

      const res = await api.post("orders/create/", payload);

      // 👉 COD FLOW
      if (paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        navigate("/orders"); // ✅ redirect
        return;
      }

      // 👉 ONLINE PAYMENT (Razorpay)
      // const options = {
      //   key: res.data.key,
      //   amount: res.data.amount * 100,
      //   currency: "INR",
      //   name: "FiTz.",
      //   order_id: res.data.razorpay_order_id,
      //   handler: async (response) => {
      //     await api.post("orders/verify/", response);
      //     toast.success("Payment successful!");
      //     navigate("/orders"); // ✅ redirect
      //   },
      // };
      // 👉 ONLINE PAYMENT
    const options = {
      key: res.data.key,
      amount: res.data.amount * 100,
      currency: "INR",
      name: "FiTz.",
      description: "Order Payment",
      order_id: res.data.razorpay_order_id,

      handler: async function (response) {
        try {
          await api.post("orders/verify/", response);
          toast.success("Payment successful!");
          navigate("/orders");
        } catch (err) {
          console.error("Verify failed", err);
          toast.error("Payment verification failed");
        }
      },

      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled");
        },
      },

      prefill: {
        name: form.full_name,
        email: "",
        contact: form.phone,
      },

      theme: {
        color: "#16a34a",
      },
    };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  if (!total || total <= 0) {
    return <p className="text-center mt-10">No items to checkout</p>;
  }

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
