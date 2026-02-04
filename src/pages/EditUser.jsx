

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserEdit, FaLock, FaChevronLeft, FaShieldAlt } from "react-icons/fa";
import api from "../api/axios";

function EditUser() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    api
      .get("auth/me/")
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch(() => {
        toast.error("Please login again");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password, confirmPassword } = formData;

    if (!name) {
      toast.info("Name is required");
      return;
    }

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const payload = { name };
      if (password) payload.password = password;

      await api.patch("auth/me/", payload);
      toast.success("Profile updated successfully");
      navigate("/user");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-4xl w-full grid md:grid-cols-12 gap-0 bg-white shadow-2xl shadow-slate-200/50 rounded-[3rem] overflow-hidden border border-slate-100">
        
        {/* Left Side: Branding/Instruction */}
        <div className="md:col-span-4 bg-slate-950 p-10 text-white flex flex-col justify-between">
          <div>
            <button 
              onClick={() => navigate("/user")}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-12"
            >
              <FaChevronLeft size={8}/> Back to Profile
            </button>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-tight">
              Update <br />
              <span className="text-sky-500">Identity.</span>
            </h2>
            <p className="text-slate-400 text-xs mt-6 leading-loose font-medium">
              Keep your personal information secure. Changes to your password will require a new login session.
            </p>
          </div>
          
          <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 p-4 rounded-2xl">
            <FaShieldAlt size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">End-to-end <br /> encrypted</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-8 p-10 md:p-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <FaUserEdit size={12} className="text-sky-600" /> Display Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-sm font-bold text-slate-900"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Password Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                  <FaLock size={10} className="text-sky-600" /> New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-sm font-bold text-slate-900"
                />
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-sm font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3"
              >
                Save Profile Changes
              </button>
              <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-6">
                Personalized for FiTz. Collective Members
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;