// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";

// function OrderDetail() {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     api.get(`orders/${id}/`).then((res) => setOrder(res.data));
//   }, [id]);

//   if (!order) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4 text-sky-700">
//         Order #{order.id}
//       </h2>

//       <div className="mb-4">
//         <p><b>Name:</b> {order.full_name}</p>
//         <p><b>Phone:</b> {order.phone}</p>
//         <p><b>Address:</b> {order.address}, {order.city}</p>
//         <p><b>Payment:</b> {order.payment_status}</p>
//         <p><b>Order:</b> {order.status}</p>
//       </div>

//       <h3 className="text-xl font-semibold mb-3">Items</h3>

//       {order.items.map((item) => (
//         <div key={item.id} className="flex gap-4 mb-3 border p-3 rounded">
//           <img src={item.image} alt="" className="w-20 h-20 object-cover" />
//           <div>
//             <p className="font-semibold">{item.product_name}</p>
//             <p>Qty: {item.quantity}</p>
//             <p>₹{item.price}</p>
//           </div>
//         </div>
//       ))}

//       <h3 className="text-right text-xl font-bold mt-4">
//         Total: ₹{order.total_amount}
//       </h3>
//     </div>
//   );
// }

// export default OrderDetail;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaChevronLeft, FaPrint, FaTruck, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`orders/${id}/`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
    </div>
  );

  return (
    <div className="bg-[#fcfcfd] min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-600 transition-colors"
          >
            <FaChevronLeft size={8}/> Back to Orders
          </button>
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors print:hidden"
          >
            <FaPrint size={12}/> Print Invoice
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
          
          {/* Header Strip */}
          <div className="bg-slate-900 p-8 md:p-12 text-white flex flex-col md:flex-row justify-between gap-6">
            <div>
              <p className="text-sky-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Order Confirmed</p>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">#{order.id}</h1>
              <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-widest">
                Placed on {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="inline-block px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800 text-[10px] font-black uppercase tracking-widest text-white mb-4">
                {order.status}
              </span>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em]">Grand Total</p>
              <p className="text-3xl font-black text-white italic tracking-tighter">₹{order.total_amount}</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Info Grid */}
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sky-600">
                  <FaTruck size={14} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Delivery Details</h3>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  <p className="font-black text-slate-900 uppercase text-xs">{order.full_name}</p>
                  <p>{order.phone}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sky-600">
                  <FaMapMarkerAlt size={14} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Shipping Address</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  {order.address},<br />
                  {order.city}, {order.state} - {order.pincode}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sky-600">
                  <FaCreditCard size={14} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Payment Info</h3>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed uppercase font-bold text-[11px]">
                  <p className="text-slate-900">{order.payment_method || 'Online Payment'}</p>
                  <p className={order.payment_status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}>
                    Status: {order.payment_status}
                  </p>
                </div>
              </div>
            </div>

            {/* Items Table Header */}
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Items Purchased</h3>
            </div>

            {/* Items List */}
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-24 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                      <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 uppercase tracking-tight text-sm">{item.product_name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-black text-slate-900">₹{item.price}</p>
                </div>
              ))}
            </div>

            {/* Final Totals */}
            <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col items-end space-y-2">
              <div className="flex justify-between w-full max-w-[200px] text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>₹{order.total_amount}</span>
              </div>
              <div className="flex justify-between w-full max-w-[200px] text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                <span>Shipping</span>
                <span className="text-emerald-500">FREE</span>
              </div>
              <div className="flex justify-between w-full max-w-[200px] pt-2">
                <span className="text-xs font-black uppercase tracking-widest text-slate-900">Total</span>
                <span className="text-xl font-black text-sky-600 italic tracking-tighter">₹{order.total_amount}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-loose">
          Thank you for choosing FiTz. <br />
          For any discrepancies, contact us at support@fitz.com
        </p>
      </div>
    </div>
  );
}

export default OrderDetail;