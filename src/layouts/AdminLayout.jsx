
// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";

// function AdminLayout() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     navigate("/");
//   };

//   return (
//     <div className="flex">
    
//       <aside className="w-64 bg-sky-800 text-white fixed top-0 left-0 h-screen flex flex-col p-5">
//         <h2 className="text-2xl font-bold mb-6 border-b border-sky-600 pb-3">
//           Admin Panel
//         </h2>

//         <nav className="flex-1 space-y-3 overflow-y-auto">
//           <button
//             onClick={() => navigate("/admin")}
//             className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
//           >
//             Dashboard
//           </button>
//           <button
//             onClick={() => navigate("/admin/users")}
//             className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
//           >
//             Manage Users
//           </button>

//           <button
//             onClick={() => navigate("/admin/products")}
//             className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
//           >
//             Manage Products
//           </button>

//           <button
//             onClick={() => navigate("/admin/orders")}
//             className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
//           >
//             Manage Orders
//           </button>

//           <button
//             onClick={() => navigate("/admin/contacts")}
//             className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
//           >
//             Manage Contacts
//           </button>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white mt-auto"
//         >
//           Back to Home
//         </button>
//       </aside>

     
//       <main className="ml-64 flex-1 h-screen overflow-y-auto bg-gray-50 p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default AdminLayout;







import React from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { 
  FaThLarge,       // Corrected icon for Dashboard
  FaUsers, 
  FaBox, 
  FaShoppingCart, 
  FaEnvelope, 
  FaSignOutAlt,
  FaShieldAlt 
} from "react-icons/fa";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem("admin");
    // Redirect to home or login page
    navigate("/");
  };

  /**
   * Helper function for dynamic NavLink styling
   * isActive is provided automatically by react-router-dom
   */
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive 
        ? "bg-sky-600 text-white shadow-lg shadow-sky-900/20" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* 🚀 Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 text-white fixed top-0 left-0 h-screen flex flex-col z-50 shadow-2xl">
        
        {/* Brand/Logo Area */}
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-sky-500 p-2 rounded-lg">
              <FaShieldAlt className="text-xl text-white" />
            </div>
            <h2 className="text-xl font-black tracking-tight uppercase">
              Core<span className="text-sky-500">Admin</span>
            </h2>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] ml-1">
            Management Suite v2.0
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {/* Dashboard Link */}
          <NavLink to="/admin" end className={navLinkClass}>
            <FaThLarge className="text-lg" />
            <span className="font-semibold text-sm">Dashboard</span>
          </NavLink>

          {/* User Management */}
          <NavLink to="/admin/users" className={navLinkClass}>
            <FaUsers className="text-lg" />
            <span className="font-semibold text-sm">Manage Users</span>
          </NavLink>

          {/* Product Management */}
          <NavLink to="/admin/products" className={navLinkClass}>
            <FaBox className="text-lg" />
            <span className="font-semibold text-sm">Manage Products</span>
          </NavLink>

          {/* Order Management */}
          <NavLink to="/admin/orders" className={navLinkClass}>
            <FaShoppingCart className="text-lg" />
            <span className="font-semibold text-sm">Manage Orders</span>
          </NavLink>

          {/* Contact/Support Management */}
          {/* <NavLink to="/admin/contacts" className={navLinkClass}>
            <FaEnvelope className="text-lg" />
            <span className="font-semibold text-sm">Manage Contacts</span>
          </NavLink> */}
        </nav>     

        {/* User / Logout Section at Bottom */}
        <div className="p-4 mt-auto border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-inner">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">System Admin</p>
                <p className="text-[10px] text-slate-500 truncate italic underline decoration-sky-500/50">
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-rose-600 hover:text-white transition-all py-2.5 rounded-xl text-xs font-bold text-slate-300"
            >
              <FaSignOutAlt />
              Back to Home
            </button>
          </div>
        </div>
      </aside>

      {/* 🖥️ Main Content Area */}
      <main className="ml-72 flex-1 min-h-screen relative overflow-x-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute top-0 left-0 w-full h-64 bg-slate-900 pointer-events-none -z-10 opacity-[0.03]"></div>
        
        {/* Padding for content inside the layout */}
        <div className="p-0">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default AdminLayout;