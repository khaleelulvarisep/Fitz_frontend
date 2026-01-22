
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
const totalRevenue = orders.reduce(
  (sum, order) => sum + Number(order.total_amount || 0),
  0
);  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5); // show latest 6 orders

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
                      {getUserDetails(order.user)}
                    </td>
                    <td className="p-3 border-t font-semibold text-green-600">
                      ₹{order.total_amount}
                    </td>
                    <td className="p-3 border-t text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="p-3 border-t">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "PLACED"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "SHIPPED"
                            ? "bg-blue-200 text-blue-800"
                            : order.status === "DELIVERED"
                            ? "bg-green-200 text-green-800"
                            : order.status === "CANCELLED"
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {order.status.toLowerCase()}
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

