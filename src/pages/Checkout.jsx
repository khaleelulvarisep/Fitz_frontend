


// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import { toast } from "react-toastify";

// function Checkout() {
//   const { user, setUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   // Detect source: BuyNow or Cart
//   useEffect(() => {
//     const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));

//     if (buyNowProduct) {
//       // Case 1: Buy Now
//       setItems([{ ...buyNowProduct, quantity: 1 }]);
//     } else if (user && user.cart && user.cart.length > 0) {
//       // Case 2: Cart Checkout
//       setItems(user.cart);
//     } else {
//       toast.info("No items found for checkout!");
//       navigate("/");
//     }
//   }, [user, navigate]);

//   // Calculate total
//   const totalAmount = items.reduce(
//     (acc, item) => acc + item.price * (item.quantity || 1),
//     0
//   );

//   // Handle placing order
//   const handleOrder = async () => {
//     if (!user) return toast.error("Please login to continue.");
//     if (!address.trim()) return toast.info("Please enter your delivery address.");

//     const orderData = {
//       userId: user.id.toString(),
//       items: items.map((item) => ({
//         productId: (item.id || item.productId).toString(), // ✅ handles both cases
//         name: item.name,
//         price: item.price,
//         image: item.image,
//         quantity: item.quantity || 1,
//         description: item.description || "",
//       })),
//       total: totalAmount,
//       address,
//       paymentMethod,
//       status: "Placed",
//       date: new Date().toISOString(),
//     };

//     try {
//       const res = await fetch("http://localhost:5000/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (res.ok) {
//        toast.success("Order placed successfully!");

//         // Clear data based on checkout type
//         if (localStorage.getItem("buyNowProduct")) {
//           localStorage.removeItem("buyNowProduct");
//         } else {
//           // clear user's cart
//           const updatedUser = { ...user, cart: [] };
//           setUser(updatedUser);
//           localStorage.setItem("user", JSON.stringify(updatedUser));
//         }

//         navigate("/");
//       } else {
//        toast.error("Failed to place order. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong while placing your order.");
//     }
//   };

//   if (items.length === 0)
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600">
//         Loading checkout...
//       </div>
//     );

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-2xl font-bold text-sky-700 mb-4 text-center">
//         Checkout
//       </h2>

//       {/* Items Summary */}
//       <div className="space-y-4 mb-6">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-4 border p-4 rounded-lg"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-20 h-20 object-cover rounded"
//             />
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.name}</h3>
//               <p className="text-gray-600 text-sm line-clamp-2">
//                 {item.description}
//               </p>
//               <p className="font-bold text-sky-700">
//                 ₹{item.price} × {item.quantity || 1}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Total */}
//       <div className="flex justify-between font-bold text-lg mb-4">
//         <span>Total:</span>
//         <span className="text-sky-700">₹{totalAmount}</span>
//       </div>

//       {/* Address */}
//       <label className="block font-semibold mb-1">Delivery Address</label>
//       <textarea
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         className="w-full border p-2 rounded mb-4"
//         rows="3"
//         placeholder="Enter delivery address"
//       />

//       {/* Payment */}
//       <label className="block font-semibold mb-1">Payment Method</label>
//       <select
//         value={paymentMethod}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//         className="w-full border p-2 rounded mb-4"
//       >
//         <option value="COD">Cash on Delivery</option>
//         <option value="Online">Online Payment</option>
//       </select>

//       <button
//         onClick={handleOrder}
//         className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
//       >
//         Place Order
//       </button>
//     </div>
//   );
// }

// export default Checkout;







import React, { useContext, useState } from "react";
import api from "../api/axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Checkout() {
  const { cart } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = cart?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const res = await api.post("orders/create/", {
        payment_method: paymentMethod,
      });

      // 👉 CASH ON DELIVERY
      if (paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        return;
      }

      // 👉 RAZORPAY
      const options = {
        key: res.data.key,
        amount: res.data.amount * 100,
        currency: "INR",
        name: "My Shop",
        order_id: res.data.razorpay_order_id,
        handler: async function (response) {
          await api.post("orders/verify/", response);
          toast.success("Payment successful!");
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <p className="mb-4 font-semibold">Total: ₹{total}</p>

      <div className="mb-4">
        <label>
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />{" "}
          Cash on Delivery
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />{" "}
          Online Payment
        </label>
      </div>

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

