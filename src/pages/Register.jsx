




import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaChevronRight, FaStar,FaEyeSlash,FaEye} from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // 👈 backend + frontend errors
  const[showPassword,setShowPassword]=useState(false)
  
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    // Frontend validations
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    else if (name.length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password))
      newErrors.password = "Password must include a number & special character";

    if (!confirmPassword) newErrors.confirm_password = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirm_password = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://fitzbackend-env.eba-ygza6tbr.eu-north-1.elasticbeanstalk.com/api/auth/register/", {
        name,
        email,
        password,
        confirm_password: confirmPassword,
      });

      toast.success("Account created");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const data = err.response?.data;

      if (data && typeof data === "object") {
        // Map backend field errors directly
        setErrors(data);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] py-12 px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">

        {/* Left Side: Brand Story */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-slate-950 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-black italic tracking-tighter mb-6">
              FiTz<span className="text-sky-500">.</span>
            </h1>
            <h2 className="text-xl font-bold uppercase tracking-widest leading-tight text-slate-200">
              Join the <br /> Collective
            </h2>
            <p className="text-slate-400 text-xs mt-6 leading-loose font-medium max-w-[280px]">
              Create an account to save your curation, track bespoke orders, and receive early access to seasonal drops.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                <FaStar size={14} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Priority Access</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Members only seasonal drops</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="p-10 md:p-16">
          <header className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Register</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Start your journey</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaUser size={10} className="text-sky-500" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alexander Fitz"
                className={`w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none transition-all text-sm font-bold ${
                  errors.name ? "border-rose-500" : "border-slate-100 focus:border-sky-500"
                }`}
              />
              {errors.name && (
                <p className="text-[10px] text-rose-600 font-semibold ml-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaEnvelope size={10} className="text-sky-500" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className={`w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none transition-all text-sm font-bold ${
                  errors.email ? "border-rose-500" : "border-slate-100 focus:border-sky-500"
                }`}
              />
              {errors.email && (
                <p className="text-[10px] text-rose-600 font-semibold ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password + Confirm */}
            <div className="grid grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <FaLock size={10} className="text-sky-500" /> Password
                </label>
                <div className="relative">
                <input
                  type={showPassword?'text':'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none transition-all text-sm font-bold ${
                    errors.password ? "border-rose-500" : "border-slate-100 focus:border-sky-500"
                  }`}
                />
                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 transition-colors"
                                >
                                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-rose-600 font-semibold ml-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Confirm
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none transition-all text-sm font-bold ${
                    errors.confirm_password ? "border-rose-500" : "border-slate-100 focus:border-sky-500"
                  }`}
                />
                {errors.confirm_password && (
                  <p className="text-[10px] text-rose-600 font-semibold ml-1">
                    {errors.confirm_password}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3 group"
            >
              {loading ? "Creating Profile..." : (
                <>
                  Create Account <FaChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4">
              Already a member?
            </p>
            <Link
              to="/login"
              className="text-sky-600 font-black uppercase tracking-[0.2em] text-[11px] hover:text-slate-900 transition-colors"
            >
              Sign In to FiTz.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
