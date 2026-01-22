
// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../context/AdminContext"; // adjust path if needed

// function AdminDashboard() {
//   const { users, orders, loading, fetchAllData } = useContext(AdminContext);

//   useEffect(() => {
//     if (!users.length || !orders.length) fetchAllData();
//   }, []);

//   // 🔹 Helper to find user name or fallback to email
//   const getUserDetails = (userId) => {
//     const user = users.find((u) => u.id === userId);
//     return user ? user.name || user.email || `User ${userId}` : `User ${userId}`;
//   };

//   // 📊 Calculations
//   const totalUsers = users.length; 
//   const totalOrders = orders.length;
// const totalRevenue = orders.reduce(
//   (sum, order) => sum + Number(order.total_amount || 0),
//   0
// );  const recentOrders = [...orders]
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5); // show latest 6 orders

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl font-semibold text-gray-600">Loading Dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
//       <h1 className="text-4xl font-extrabold text-sky-800 mb-10 text-center">
//         Admin Dashboard
//       </h1>

//       {/* 🔹 Top Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-12">
//         <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-sky-500 hover:scale-105 transform transition-all">
//           <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
//           <p className="text-4xl font-bold text-sky-600 mt-2">{totalUsers}</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:scale-105 transform transition-all">
//           <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
//           <p className="text-4xl font-bold text-yellow-600 mt-2">{totalOrders}</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500 hover:scale-105 transform transition-all">
//           <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
//           <p className="text-4xl font-bold text-green-600 mt-2">
//             ₹{totalRevenue.toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* 🧾 Recent Orders */}
//       <div className="bg-white rounded-2xl shadow-lg p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-sky-700">Recent Orders</h2>
//           <span className="text-gray-500 text-sm">
//             Showing last {recentOrders.length} orders
//           </span>
//         </div>

//         {orders.length === 0 ? (
//           <p className="text-gray-500 text-center py-8 text-lg">
//             No orders have been placed yet.
//           </p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-sky-100 text-sky-900 text-sm uppercase">
//                   <th className="p-3 text-left rounded-tl-lg">Order ID</th>
//                   <th className="p-3 text-left">User</th>
//                   <th className="p-3 text-left">Total</th>
//                   <th className="p-3 text-left">Date</th>
//                   <th className="p-3 text-left rounded-tr-lg">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentOrders.map((order, idx) => (
//                   <tr
//                     key={order.id}
//                     className={`hover:bg-sky-50 transition ${
//                       idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     }`}
//                   >
//                     <td className="p-3 border-t font-medium text-gray-700">
//                       {order.id}
//                     </td>
//                     <td className="p-3 border-t text-gray-700">
//                       {getUserDetails(order.user)}
//                     </td>
//                     <td className="p-3 border-t font-semibold text-green-600">
//                       ₹{order.total_amount}
//                     </td>
//                     <td className="p-3 border-t text-gray-500">
//                       {new Date(order.created_at).toLocaleString()}
//                     </td>
//                     <td className="p-3 border-t">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           order.status === "PLACED"
//                             ? "bg-yellow-200 text-yellow-800"
//                             : order.status === "SHIPPED"
//                             ? "bg-blue-200 text-blue-800"
//                             : order.status === "DELIVERED"
//                             ? "bg-green-200 text-green-800"
//                             : order.status === "CANCELLED"
//                             ? "bg-red-200 text-red-800"
//                             : "bg-gray-200 text-gray-800"
//                         }`}
//                       >
//                         {order.status.toLowerCase()}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;








import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";

function AdminDashboard() {
  const { users, orders, loading, fetchAllData } = useContext(AdminContext);

  useEffect(() => {
    if (!users.length || !orders.length) fetchAllData();
  }, []);

  const getUserDetails = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name || user.email || `User ${userId}` : `User ${userId}`;
  };

  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mb-4"></div>
        <div className="text-slate-500 font-medium">Synchronizing Data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Executive Overview</h1>
            <p className="text-slate-500 mt-1">Metrics and recent activity across your platform.</p>
          </div>
          <button 
            onClick={() => fetchAllData()} 
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            <span>🔄</span> Refresh Data
          </button>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Users */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl">👥</span>
            </div>
            <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Customers</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-4xl font-black text-slate-900">{totalUsers.toLocaleString()}</p>
              <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded">+12%</span>
            </div>
          </div>

          {/* Card 2: Orders */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl">📦</span>
            </div>
            <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Orders</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-4xl font-black text-slate-900">{totalOrders.toLocaleString()}</p>
              <span className="text-sky-500 text-xs font-bold bg-sky-50 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>

          {/* Card 3: Revenue */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group bg-gradient-to-br from-white to-slate-50">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl">💰</span>
            </div>
            <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Revenue</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-4xl font-black text-emerald-600">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
            <button className="text-sky-600 hover:text-sky-700 text-sm font-bold transition">View All Orders →</button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg italic">No transaction history found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-[0.1em]">
                    <th className="px-6 py-4">Ref ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4 text-center">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">#{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{getUserDetails(order.user)}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        ₹{order.total_amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                             order.status === "PLACED"
                            ? "bg-yellow-200 text-yellow-800"
                            :  order.status === "SHIPPED"
                            ? "bg-blue-200 text-blue-800"
                            : order.status === "DELIVERED"
                            ? "bg-green-200 text-green-800"
                            : order.status === "CANCELLED"
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-200 text-gray-800"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
