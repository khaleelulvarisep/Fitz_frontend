
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser,FaClipboardList, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
// import { UserContext } from "../context/UserContext";
// import { toast } from "react-toastify";

// function UserProfile() {
//   const { user,logout} = useContext(UserContext);
//   const navigate = useNavigate();

  

  

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 py-10">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-sky-100 flex flex-col">
//         <div className="text-center mb-6">
//           <FaUser className="text-sky-500 text-6xl mx-auto mb-3" />
//           <h2 className="text-3xl font-bold text-sky-700">{user.name}</h2>
//           <p className="text-gray-600">{user.email}</p>
//         </div>

//         <button
//           onClick={() => navigate("/edit-user")}
//           className="mt-2 w-full flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
//         >
//           <FaUserEdit /> Edit Profile
//         </button>

//         <button
//           onClick={() => navigate("/orders")}
//           className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
//         >
//           <FaClipboardList /> View Orders
//         </button>

//         <button
//            onClick={() => {
//       logout();
//       navigate("/login");
//       toast.warn("Logout")
//     }}
//           className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all"
//         >
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;





import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBox, FaUserEdit, FaSignOutAlt, FaChevronRight, FaShieldAlt } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import api from "../api/axios";

function UserProfile() {
  const { user, logout, token } = useContext(UserContext);
  const[orders,setOrders]=useState([])
  const navigate = useNavigate();
   useEffect(() => {
    api.get("orders/")
      .then((res) => setOrders(res.data))
      .catch(() => navigate("/login"));
  }, []);
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (!user) return null;

  return (
    <div className="bg-[#fcfcfd] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-sky-50 flex items-center justify-center border-4 border-white shadow-lg">
              <FaUserCircle className="text-sky-200 text-7xl" />
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full"></div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <span className="text-sky-600 text-[10px] font-black uppercase tracking-[0.4em]">Verified Member</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{user.name}</h1>
            <p className="text-slate-400 font-medium">{user.email}</p>
          </div>

          <div className="flex gap-4">
            <div className="text-center px-6 py-2 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Orders</p>
              <p className="text-xl font-black text-slate-900">{orders.length}</p>
            </div>
            <div className="text-center px-6 py-2 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Points</p>
              <p className="text-xl font-black text-sky-600">450</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* --- Account Settings Group --- */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Account Management</h3>
            
            <button 
              onClick={() => navigate("/edit-user")}
              className="w-full group flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <FaUserEdit size={20} />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-900 text-sm uppercase tracking-tight">Personal Info</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Update name & email</p>
                </div>
              </div>
              <FaChevronRight className="text-slate-200 group-hover:text-sky-600 transition-all" size={12} />
            </button>

            <button 
              onClick={() => navigate("/orders")}
              className="w-full group flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <FaBox size={18} />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-900 text-sm uppercase tracking-tight">Order History</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Track and manage orders</p>
                </div>
              </div>
              <FaChevronRight className="text-slate-200 group-hover:text-amber-500 transition-all" size={12} />
            </button>
          </div>

          {/* --- Security & Logout Group --- */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Security & Session</h3>
            
            <button className="w-full group flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <FaShieldAlt size={18} />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-900 text-sm uppercase tracking-tight">Privacy</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Manage your security</p>
                </div>
              </div>
              <FaChevronRight className="text-slate-200 group-hover:text-emerald-500 transition-all" size={12} />
            </button>

            <button 
              onClick={() => {
                logout();
                navigate("/login");
                toast.warn("Logged out of session");
              }}
              className="w-full group flex items-center justify-between bg-rose-50/50 p-6 rounded-3xl border border-rose-100 hover:bg-rose-600 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white text-rose-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-rose-500 group-hover:text-white">
                  <FaSignOutAlt size={18} />
                </div>
                <div className="text-left">
                  <p className="font-black text-rose-900 group-hover:text-white text-sm uppercase tracking-tight">Logout</p>
                  <p className="text-[10px] text-rose-400 group-hover:text-rose-100 font-bold uppercase">Securely end session</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* --- Footer Support Note --- */}
        <p className="text-center mt-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
          Need help? Contact our support team <br />
          <span className="text-sky-600 cursor-pointer">Support@Fitz.com</span>
        </p>
      </div>
    </div>
  );
}

export default UserProfile;