

import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import api from "../api/axios";

import {
  FaUserShield,
  FaUserSlash,
  FaCheckCircle,
  FaBan,
  FaSearch,
  FaBoxOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";

function ManageUsers() {
  const { users, fetchAllData } = useContext(AdminContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      axios
        .get(`http://localhost:5000/orders?userId=${selectedUser.id}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error fetching user orders:", err));
    }
  }, [selectedUser]);

  const toggleBlock = async (user) => {
    try {
      
      await api.patch(`admin/users/${user.id}/block/`,{
        'is_active':!user.is_active
      });
      fetchAllData();
      // if (selectedUser?.id === user.id) setSelectedUser(updatedUser);
      if(user.is_active){
        toast.error('User blocked')
      }else{
        toast.success('User unblocked')
      }
    } catch (err) {
      console.error("Error toggling block:", err);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-sky-700 text-white px-6 py-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaUserShield className="text-yellow-300" />
            Manage Users
          </h2>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-sky-400 w-64"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex h-[75vh]">
          {/* Sidebar - User List */}
          <aside className="w-1/3 border-r bg-gray-50 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaUserSlash size={40} className="mb-3" />
                No users found
              </div>
            ) : (
              filteredUsers.map((u) => (
                <div
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`flex justify-between items-center p-4 border-b transition-all cursor-pointer ${
                    selectedUser?.id === u.id
                      ? "bg-sky-100 border-sky-300 shadow-sm"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-800">{u.name}</p>
                    <p
                      className={`text-xs font-medium ${
                        !u.is_active ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {u.is_active ? "Active":"Blocked"}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBlock(u);
                    }}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium shadow-md transition-all ${
                      !u.is_active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {u.is_active ? (
                      <>
                        <FaCheckCircle /> Block
                      </>
                    ) : (
                      <>
                        <FaBan /> Unblock
                      </>
                    )}
                  </button>
                </div>
              ))
            )}
          </aside>

          {/* Main - User Details & Orders */}
          <main className="flex-1 bg-gradient-to-br from-white to-sky-50 p-6 overflow-y-auto">
            {!selectedUser ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaUserSlash size={48} className="mb-3 text-gray-400" />
                Select a user to view details
              </div>
            ) : (
              <div className="animate-fadeIn">
                {/* User Details Card */}
                <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-sky-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-sky-800">
                      👤 {selectedUser.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        !selectedUser.is_active
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {!selectedUser.is_active ? "Blocked" : "Active"}
                    </span>
                  </div>

                  <div className="text-gray-700 space-y-1">
                    <p>
                      <strong>Email:</strong> {selectedUser.email}
                    </p>
                    <p>
                      <strong>User ID:</strong> {selectedUser.id}
                    </p>
                  </div>
                </div>

                {/* Orders Section */}
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBoxOpen className="text-sky-600" /> Recent Orders
                </h4>

                {orders.length === 0 ? (
                  <p className="text-gray-500 italic">No orders found.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-800">
                            Order #{o.id}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              o.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : o.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : o.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {o.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          <strong>Total:</strong> ₹{o.total}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(o.date).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;



