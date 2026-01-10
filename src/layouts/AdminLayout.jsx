
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="flex">
    
      <aside className="w-64 bg-sky-800 text-white fixed top-0 left-0 h-screen flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-6 border-b border-sky-600 pb-3">
          Admin Panel
        </h2>

        <nav className="flex-1 space-y-3 overflow-y-auto">
          <button
            onClick={() => navigate("/admin")}
            className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
          >
            Manage Users
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
          >
            Manage Products
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
          >
            Manage Orders
          </button>

          <button
            onClick={() => navigate("/admin/contacts")}
            className="block w-full text-left hover:bg-sky-700 px-3 py-2 rounded"
          >
            Manage Contacts
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white mt-auto"
        >
          Back to Home
        </button>
      </aside>

     
      <main className="ml-64 flex-1 h-screen overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
