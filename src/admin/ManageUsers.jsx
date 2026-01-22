

// import React, { useContext, useState, useEffect } from "react";
// import { AdminContext } from "../context/AdminContext";
// import axios from "axios";
// import api from "../api/axios";

// import {
//   FaUserShield,
//   FaUserSlash,
//   FaCheckCircle,
//   FaBan,
//   FaSearch,
//   FaBoxOpen,
// } from "react-icons/fa";
// import { toast } from "react-toastify";

// function ManageUsers() {
//   const { users, fetchAllData } = useContext(AdminContext);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     if (users.length > 0 && !selectedUser) {
//       setSelectedUser(users[0]);
//     }
//   }, [users, selectedUser]);

//   useEffect(() => {
//     if (selectedUser) {
//       api
//         .get(`admin/orders/${selectedUser.id}/get/`)
//         .then((res) => setOrders(res.data))
//         .catch((err) => console.error("Error fetching user orders:", err));
//     }
//   }, [selectedUser]);

//   const toggleBlock = async (user) => {
//     try {
      
//       await api.patch(`admin/users/${user.id}/block/`,{
//         'is_active':!user.is_active
//       });
//       fetchAllData();
//       if (selectedUser?.id === user.id) setSelectedUser(updatedUser);
//       if(user.is_active){
//         toast.error('User blocked')
//       }else{
//         toast.success('User unblocked')
//       }
//     } catch (err) {
//       console.error("Error toggling block:", err);
//     }
//   };

//   const filteredUsers = users.filter((u) =>
//     u.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 p-6">
//       <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
//         {/* Header */}
//         <div className="flex justify-between items-center bg-sky-700 text-white px-6 py-4">
//           <h2 className="text-2xl font-semibold flex items-center gap-2">
//             <FaUserShield className="text-yellow-300" />
//             Manage Users
//           </h2>

//           <div className="relative">
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-sky-400 w-64"
//             />
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex h-[75vh]">
//           {/* Sidebar - User List */}
//           <aside className="w-1/3 border-r bg-gray-50 overflow-y-auto">
//             {filteredUsers.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                 <FaUserSlash size={40} className="mb-3" />
//                 No users found
//               </div>
//             ) : (
//               filteredUsers.map((u) => (
//                 <div
//                   key={u.id}
//                   onClick={() => setSelectedUser(u)}
//                   className={`flex justify-between items-center p-4 border-b transition-all cursor-pointer ${
//                     selectedUser?.id === u.id
//                       ? "bg-sky-100 border-sky-300 shadow-sm"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <div>
//                     <p className="font-semibold text-gray-800">{u.name}</p>
//                     <p
//                       className={`text-xs font-medium ${
//                         !u.is_active ? "text-red-500" : "text-green-600"
//                       }`}
//                     >
//                       {u.is_active ? "Active":"Blocked"}
//                     </p>
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleBlock(u);
//                     }}
//                     className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium shadow-md transition-all ${
//                       !u.is_active
//                         ? "bg-green-100 text-green-700 hover:bg-green-200"
//                         : "bg-red-100 text-red-700 hover:bg-red-200"
//                     }`}
//                   >
//                     {u.is_active ? (
//                       <>
//                         <FaCheckCircle /> Block
//                       </>
//                     ) : (
//                       <>
//                         <FaBan /> Unblock
//                       </>
//                     )}
//                   </button>
//                 </div>
//               ))
//             )}
//           </aside>

//           {/* Main - User Details & Orders */}
//           <main className="flex-1 bg-gradient-to-br from-white to-sky-50 p-6 overflow-y-auto">
//             {!selectedUser ? (
//               <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                 <FaUserSlash size={48} className="mb-3 text-gray-400" />
//                 Select a user to view details
//               </div>
//             ) : (
//               <div className="animate-fadeIn">
//                 {/* User Details Card */}
//                 <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-sky-100">
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-xl font-bold text-sky-800">
//                       👤 {selectedUser.name}
//                     </h3>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                         !selectedUser.is_active
//                           ? "bg-red-100 text-red-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {!selectedUser.is_active ? "Blocked" : "Active"}
//                     </span>
//                   </div>

//                   <div className="text-gray-700 space-y-1">
//                     <p>
//                       <strong>Email:</strong> {selectedUser.email}
//                     </p>
//                     <p>
//                       <strong>User ID:</strong> {selectedUser.id}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Orders Section */}
//                 <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <FaBoxOpen className="text-sky-600" /> Recent Orders
//                 </h4>

//                 {orders.length === 0 ? (
//                   <p className="text-gray-500 italic">No orders found.</p>
//                 ) : (
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {orders.map((o) => (
//                       <div
//                         key={o.id}
//                         className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
//                       >
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="font-semibold text-gray-800">
//                             Order #{o.id}
//                           </span>
//                           <span
//                             className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                                o.status === "PLACED"
//                             ? "bg-yellow-200 text-yellow-800"
//                             :  o.status === "SHIPPED"
//                             ? "bg-blue-200 text-blue-800"
//                             : o.status === "DELIVERED"
//                             ? "bg-green-200 text-green-800"
//                             : o.status === "CANCELLED"
//                             ? "bg-red-200 text-red-800"
//                             : "bg-gray-200 text-gray-800"
//                             }`}
//                           >
//                             {o.status}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-700">
//                           <strong>Total:</strong> ₹{o.total_amount}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {new Date(o.created_at).toLocaleString()}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageUsers;



import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import api from "../api/axios";
import {
  FaUserShield,
  FaUserSlash,
  FaSearch,
  FaBoxOpen,
  FaLock,
  FaUnlock,
  FaEnvelope,
  FaFingerprint
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
      api
        .get(`admin/orders/${selectedUser.id}/get/`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error fetching user orders:", err));
    }
  }, [selectedUser]);

  const toggleBlock = async (user) => {
    try {
      await api.patch(`admin/users/${user.id}/block/`, {
        'is_active': !user.is_active
      });
      fetchAllData();
      
      // Update selected user state locally if they are the one being toggled
      if (selectedUser?.id === user.id) {
        setSelectedUser({ ...selectedUser, is_active: !user.is_active });
      }

      if (user.is_active) {
        toast.error(`Account for ${user.name} has been restricted.`);
      } else {
        toast.success(`Account for ${user.name} has been restored.`);
      }
    } catch (err) {
      toast.error("Failed to update user status.");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <FaUserShield className="text-indigo-600" /> User Directory
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage permissions and view customer history</p>
          </div>

          <div className="relative group">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none w-full md:w-80 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          
          {/* Left Sidebar: User List */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Registered Users ({filteredUsers.length})
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <FaUserSlash size={32} className="mb-2 opacity-20" />
                  <p className="text-sm">No matches found</p>
                </div>
              ) : (
                filteredUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`w-full text-left p-4 flex items-center gap-4 transition-all border-b border-slate-50 last:border-0 ${
                      selectedUser?.id === u.id
                        ? "bg-indigo-50 border-l-4 border-l-indigo-600"
                        : "hover:bg-slate-50 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      u.is_active ? "bg-indigo-100 text-indigo-700" : "bg-rose-100 text-rose-700"
                    }`}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{u.name}</p>
                      <p className="text-xs text-slate-500 truncate">{u.email}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${u.is_active ? "bg-emerald-500" : "bg-rose-500"}`} />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Main: Details */}
          <div className="lg:col-span-8 overflow-y-auto pr-2 space-y-6">
            {!selectedUser ? (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                <p>Select a user from the directory to view profile</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
                        {selectedUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">{selectedUser.name}</h2>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <span className="flex items-center gap-1.5 text-sm text-slate-500">
                            <FaEnvelope className="text-slate-400" /> {selectedUser.email}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-slate-500">
                            <FaFingerprint className="text-slate-400" /> ID: {selectedUser.id}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleBlock(selectedUser)}
                      className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                        selectedUser.is_active
                          ? "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                          : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"
                      }`}
                    >
                      {selectedUser.is_active ? (
                        <>
                          <FaLock className="text-xs" /> Restrict Account
                        </>
                      ) : (
                        <>
                          <FaUnlock className="text-xs" /> Restore Access
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* History Section */}
                <div className="flex items-center gap-2 mb-4">
                  <FaBoxOpen className="text-indigo-600" />
                  <h3 className="font-bold text-slate-900">Purchase History</h3>
                  <span className="ml-auto text-xs font-bold text-slate-400 uppercase">
                    {orders.length} Total Orders
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-slate-100/50 border border-dashed border-slate-200 rounded-2xl p-10 text-center">
                    <p className="text-slate-400 text-sm">This user hasn't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-all shadow-sm group"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                            #{o.id}
                          </span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                             o.status === "PLACED"
                            ? "bg-yellow-200 text-yellow-800"
                            :  o.status === "SHIPPED"
                            ? "bg-blue-200 text-blue-800"
                            : o.status === "DELIVERED"
                            ? "bg-green-200 text-green-800"
                            : o.status === "CANCELLED"
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-200 text-gray-800"
                          }`}>
                            {o.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Total Amount</p>
                            <p className="text-lg font-black text-slate-900">₹{o.total_amount}</p>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium italic">
                            {new Date(o.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;