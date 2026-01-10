// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [usersRes, ordersRes] = await Promise.all([
//         axios.get("http://localhost:5000/users"),
//         axios.get("http://localhost:5000/orders"),
//       ]);
//       setUsers(usersRes.data);
//       setOrders(ordersRes.data);
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
//   const activeUsers = users.filter((u) => !u.isBlock).length;
//   const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

//   if (loading) return <h2 className="text-center mt-10 text-lg">Loading dashboard...</h2>;

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Users</h1>

//       {/* 🧩 Stats Overview */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
//         <div className="bg-white shadow rounded-xl p-5 border-t-4 border-sky-500">
//           <h2 className="text-gray-600 text-sm font-semibold">Total Users</h2>
//           <p className="text-3xl font-bold text-sky-600 mt-2">{users.length}</p>
//         </div>

//         <div className="bg-white shadow rounded-xl p-5 border-t-4 border-green-500">
//           <h2 className="text-gray-600 text-sm font-semibold">Active Users</h2>
//           <p className="text-3xl font-bold text-green-600 mt-2">{activeUsers}</p>
//         </div>

//         <div className="bg-white shadow rounded-xl p-5 border-t-4 border-yellow-500">
//           <h2 className="text-gray-600 text-sm font-semibold">Total Orders</h2>
//           <p className="text-3xl font-bold text-yellow-600 mt-2">{orders.length}</p>
//         </div>

//         <div className="bg-white shadow rounded-xl p-5 border-t-4 border-purple-500 col-span-2">
//           <h2 className="text-gray-600 text-sm font-semibold">Total Revenue</h2>
//           <p className="text-3xl font-bold text-purple-600 mt-2">₹{totalRevenue.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* 📝 Recent Orders */}
//       <div className="bg-white shadow rounded-xl p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
//         {recentOrders.length === 0 ? (
//           <p className="text-gray-500">No orders yet.</p>
//         ) : (
//           <ul className="divide-y">
//             {recentOrders.map((order) => (
//               <li key={order.id} className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="font-semibold text-gray-800">Order ID: {order.id}</p>
//                   <p className="text-sm text-gray-500">{order.name || order.customer?.fullName}</p>
//                 </div>
//                 <div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     order.status === "Pending"
//                       ? "bg-yellow-200 text-yellow-800"
//                       : order.status === "Shipped"
//                       ? "bg-blue-200 text-blue-800"
//                       : order.status === "Delivered"
//                       ? "bg-green-200 text-green-800"
//                       : "bg-gray-200 text-gray-800"
//                   }`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;





import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext"; // adjust path if needed

function AdminDashboard() {
  const { users, orders, loading, fetchAllData } = useContext(AdminContext);

  useEffect(() => {
    if (!users.length || !orders.length) fetchAllData();
  }, []);

  // 🔹 Helper to find user name or fallback to email
  const getUserDetails = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name || user.email || `User ${userId}` : `User ${userId}`;
  };

  // 📊 Calculations
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6); // show latest 6 orders

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <h1 className="text-4xl font-extrabold text-sky-800 mb-10 text-center">
        Admin Dashboard
      </h1>

      {/* 🔹 Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-sky-500 hover:scale-105 transform transition-all">
          <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
          <p className="text-4xl font-bold text-sky-600 mt-2">{totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:scale-105 transform transition-all">
          <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500 hover:scale-105 transform transition-all">
          <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 🧾 Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-sky-700">Recent Orders</h2>
          <span className="text-gray-500 text-sm">
            Showing last {recentOrders.length} orders
          </span>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-lg">
            No orders have been placed yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-sky-100 text-sky-900 text-sm uppercase">
                  <th className="p-3 text-left rounded-tl-lg">Order ID</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-sky-50 transition ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3 border-t font-medium text-gray-700">
                      {order.id}
                    </td>
                    <td className="p-3 border-t text-gray-700">
                      {getUserDetails(order.userId)}
                    </td>
                    <td className="p-3 border-t font-semibold text-green-600">
                      ₹{order.total}
                    </td>
                    <td className="p-3 border-t text-gray-500">
                      {new Date(order.date).toLocaleString()}
                    </td>
                    <td className="p-3 border-t">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Placed"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "Shipped"
                            ? "bg-blue-200 text-blue-800"
                            : order.status === "Delivered"
                            ? "bg-green-200 text-green-800"
                            : order.status === "Cancelled"
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

