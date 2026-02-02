




import React, { useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShieldAlt, FaTruck, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

function Checkout() {
  const { cart } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const total = buyNowProduct
    ? buyNowProduct.price
    : cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    // Basic Validation
    if (!form.full_name || !form.phone || !form.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const payload = { ...form, payment_method: paymentMethod };
      if (buyNowProduct) {
        payload.product_id = buyNowProduct.id;
        payload.quantity = 1;
      }

      const res = await api.post("orders/create/", payload);

      if (paymentMethod === "COD") {
        toast.success("Order placed successfully!");
       
        navigate("/orders");
        return;
      }

      const options = {
        key: res.data.key,
        amount: res.data.amount * 100,
        currency: "INR",
        name: "FiTz.",
        description: "Secure Order Payment",
        order_id: res.data.razorpay_order_id,
        handler: async function (response) {
          try {
            await api.post("orders/verify/", response);
            toast.success("Payment successful!");
            navigate("/orders");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        prefill: { name: form.full_name, contact: form.phone },
        theme: { color: "#0ea5e9" }, // Sky 500
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
    }
  };

  if (!total || total <= 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-slate-400">Your bag is empty</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-sky-600 font-bold uppercase tracking-widest text-xs">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Checkout</h1>
          <div className="h-[1px] flex-1 bg-slate-200"></div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
            <FaShieldAlt /> Secure SSL Encryption
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* LEFT: Shipping Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
                  <FaTruck size={18} />
                </div>
                <h2 className="font-black text-slate-900 uppercase tracking-tight">Shipping Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input name="full_name" onChange={handleChange} className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-colors text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input name="phone" onChange={handleChange} className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-colors text-sm" placeholder="+91 00000 00000" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                  <input name="city" onChange={handleChange} className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-colors text-sm" placeholder="Mumbai" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                  <textarea name="address" onChange={handleChange} rows="3" className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-colors text-sm" placeholder="House No, Building, Street Name" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
                  <input name="state" onChange={handleChange} className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-colors text-sm" placeholder="Maharashtra" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pincode</label>
                  <input name="pincode" onChange={handleChange} className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-colors text-sm" placeholder="400001" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Summary & Payment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-xl font-black uppercase italic tracking-tighter mb-6">Payment Method</h2>
              
              <div className="space-y-3 mb-8">
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'ONLINE' ? 'border-sky-500 bg-sky-500/10' : 'border-slate-800 bg-slate-800/50'}`}>
                  <div className="flex items-center gap-3">
                    <FaCreditCard className={paymentMethod === 'ONLINE' ? 'text-sky-400' : 'text-slate-500'} />
                    <span className="text-sm font-bold uppercase tracking-widest">Online Payment</span>
                  </div>
                  <input type="radio" name="pay" checked={paymentMethod === "ONLINE"} onChange={() => setPaymentMethod("ONLINE")} className="accent-sky-500" />
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-sky-500 bg-sky-500/10' : 'border-slate-800 bg-slate-800/50'}`}>
                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className={paymentMethod === 'COD' ? 'text-sky-400' : 'text-slate-500'} />
                    <span className="text-sm font-bold uppercase tracking-widest">Cash on Delivery</span>
                  </div>
                  <input type="radio" name="pay" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} className="accent-sky-500" />
                </label>
              </div>

              <div className="border-t border-slate-800 pt-6 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <span>Grand Total</span>
                  <span className="text-white">Tax Included</span>
                </div>
                <p className="text-4xl font-black tracking-tighter italic">₹{total.toLocaleString()}</p>
              </div>

              <button
                onClick={placeOrder}
                className="w-full mt-8 bg-sky-600 hover:bg-sky-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all active:scale-95 shadow-lg shadow-sky-600/20"
              >
                Complete Purchase
              </button>
            </div>
            
            <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest px-8">
              By placing an order, you agree to FiTz. <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Return Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;