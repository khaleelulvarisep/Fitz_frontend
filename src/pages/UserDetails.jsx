
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser,FaClipboardList, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

function UserProfile() {
  const { user,logout} = useContext(UserContext);
  const navigate = useNavigate();

  

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg font-medium">
        No user found. Please log in.
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-sky-100 flex flex-col">
        <div className="text-center mb-6">
          <FaUser className="text-sky-500 text-6xl mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-sky-700">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <button
          onClick={() => navigate("/edit-user")}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
        >
          <FaUserEdit /> Edit Profile
        </button>

        <button
          onClick={() => navigate("/Uorders")}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
        >
          <FaClipboardList /> View Orders
        </button>

        <button
           onClick={() => {
      logout();
      navigate("/login");
      toast.warn("Logout")
    }}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
