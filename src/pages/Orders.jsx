// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get("orders/")
//       .then((res) => setOrders(res.data))
//       .catch(() => navigate("/login"));
//   }, []);

//   if (orders.length === 0) {
//     return <p className="text-center mt-10">No orders found</p>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6 text-sky-700">My Orders</h2>

//       {orders.map((order) => (
//         <div
//           key={order.id}
//           className="border rounded-lg p-4 mb-4 shadow cursor-pointer hover:bg-gray-50"
//           onClick={() => navigate(`/orders/${order.id}`)}
//         >
//           <div className="flex justify-between">
//             <p className="font-semibold">Order #{order.id}</p>
//             <p className="text-green-600">₹{order.total_amount}</p>
//           </div>

//           <p className="text-sm text-gray-600">
//             {new Date(order.created_at).toLocaleDateString()}
//           </p>

//           <p className="text-sm">
//             Payment:{" "}
//             <span className="font-medium">{order.payment_status}</span>
//           </p>
//            <p className="text-sm">
//             Order:{" "}
//             <span className="font-medium">{order.status}</span>
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Orders;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaBoxOpen, FaChevronRight, FaRegCalendarAlt, FaWallet } from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get("orders/")
      .then((res) => setOrders(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  // Helper for Status Badge Colors
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "placed") return "bg-amber-100 text-amber-700 border-amber-200";
    if (s === "shipped") return "bg-blue-100 text-blue-700 border-blue-200";
    if (s === "delivered") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (s === "cancelled") return "bg-rose-100 text-rose-700 border-rose-200";
    return "bg-slate-50 text-slate-600 border-slate-100";
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <FaBoxOpen className="text-slate-200 text-3xl" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">No Orders Yet</h2>
        <p className="text-slate-400 text-sm mt-2 mb-8">Your purchase history will appear here.</p>
        <button onClick={() => navigate("/")} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px]">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Header */}
        <div className="mb-10">
          <span className="text-sky-600 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">Purchase History</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            My <span className="text-sky-600">Orders</span>
          </h1>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
              className="group bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                {/* Visual Icon */}
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                  <FaBoxOpen size={24} />
                </div>

                {/* Main Info */}
                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 uppercase tracking-tight">Order #{order.id}</h3>
                  <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><FaRegCalendarAlt size={10}/> {new Date(order.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><FaWallet size={10}/> {order.payment_status}</span>
                  </div>
                </div>
              </div>

              {/* Status & Price Section */}
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Amount</p>
                  <p className="text-xl font-black text-slate-900 tracking-tighter italic">₹{order.total_amount}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                  <FaChevronRight className="text-slate-200 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-loose">
          Showing {orders.length} recent purchases <br />
          For support regarding an order, please quote the Order ID.
        </p>
      </div>
    </div>
  );
}

export default Orders;