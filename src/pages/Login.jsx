
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!email || !password) {
//     setMessage("⚠️ Please enter both email and password");
//     return;
//   }

//   try {
//     const res = await axios.post(
//       "http://localhost:8000/api/auth/login/",
//       {
//         email: email,
//         password: password,
//       }
//     );

//     // ✅ Store JWT tokens
//     localStorage.setItem("access", res.data.access);
//     localStorage.setItem("refresh", res.data.refresh);

//     setMessage("✅ Login successful!");
//     toast.success("Login sussess.");

//     setTimeout(() => {
//       window.location.href = "/";
//     }, 800);

//   } catch (err) {
//      const msg =
//     err.response?.data?.detail ||
//     err.response?.data?.error ||
//     "Login failed. Please try again.";
//     setMessage(`❌ ${msg}` );

   
//   }
// };


//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold text-sky-600 mb-6 text-center">Login</h2>

//       {message && (
//         <div
//           className={`mb-4 text-center font-medium ${
//             message.includes("successful")
//               ? "text-green-600"
//               : "text-red-600"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition"
//         >
//           Login
//         </button>
//       </form>

//       <div className="mt-4 text-center">
//         <Link
//           to="/signup"
//           className="inline-block bg-gray-100 text-sky-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
//         >
//           Create Account
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Login;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEnvelope, FaLock, FaArrowRight, FaFingerprint } from "react-icons/fa";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.warn("Credentials required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/auth/login/",
//         { email, password }
//       );

//       localStorage.setItem("access", res.data.access);
//       localStorage.setItem("refresh", res.data.refresh);

//       toast.success("Welcome back to FiTz.");

//       setTimeout(() => {
//         window.location.href = "/";
//       }, 800);
//     } catch (err) {
//       const msg = err.response?.data?.detail || "Invalid credentials";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] px-6">
//       <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        
//         {/* Left Side: Brand Visual */}
//         <div className="hidden md:flex flex-col justify-between p-12 bg-slate-950 text-white relative overflow-hidden">
//           {/* Decorative Gradient Blob */}
//           <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl"></div>
          
//           <div className="relative z-10">
//             <h1 className="text-5xl font-black italic tracking-tighter leading-none mb-6">
//               FiTz<span className="text-sky-500">.</span>
//             </h1>
//             <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[240px]">
//               Access your curated collection and personalized style dashboard.
//             </p>
//           </div>

//           <div className="relative z-10">
//             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-500 mb-4">
//               <span className="w-8 h-[1px] bg-sky-500"></span> Member Access
//             </div>
//             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
//               Refined. Minimal. Iconic. <br />
//               The standard for modern aesthetics.
//             </p>
//           </div>
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="p-10 md:p-16 flex flex-col justify-center">
//           <div className="mb-10 text-center md:text-left">
//             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
//               Login
//             </h2>
//             <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">
//               Please enter your credentials
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
//                 <FaEnvelope size={10} className="text-sky-600" /> Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="style@fitz.com"
//                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-sm font-bold text-slate-900"
//                 required
//               />
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <div className="flex justify-between items-center px-1">
//                 <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
//                   <FaLock size={10} className="text-sky-600" /> Password
//                 </label>
//                 <Link to="/forgot-password text-[9px] font-black uppercase text-slate-300 hover:text-sky-600 transition-colors tracking-widest">
//                   Forgot?
//                 </Link>
//               </div>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-sm font-bold text-slate-900"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3"
//             >
//               {loading ? "Authenticating..." : (
//                 <>
//                   Enter Dashboard <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Footer Link */}
//           <div className="mt-12 text-center">
//             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4">
//               Don't have an account?
//             </p>
//             <Link
//               to="/signup"
//               className="inline-flex items-center gap-2 text-sky-600 font-black uppercase tracking-[0.2em] text-[11px] group"
//             >
//               Create Account <FaFingerprint size={14} className="group-hover:scale-110 transition-transform" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;






// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEnvelope, FaLock, FaArrowRight, FaFingerprint,FaEyeSlash,FaEye } from "react-icons/fa";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({}); // 👈 NEW
//   const[showPassword,setShowPassword]=useState(false)
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({}); // clear previous errors

//     if (!email || !password) {
//       setErrors({
//         email: !email ? "Email is required" : "",
//         password: !password ? "Password is required" : "",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8000/api/auth/login/", {
//         email,
//         password,
//       });

//       localStorage.setItem("access", res.data.access);
//       localStorage.setItem("refresh", res.data.refresh);

//       toast.success("Welcome back to FiTz.");
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 800);
//     } catch (err) {
//       const data = err.response?.data;

//       // Handle backend error messages
//       if (data?.detail) {
//         setErrors({
//           email: " ",
//           password: data.detail,
//         });
//       } else {
//         setErrors({
//           email: "Invalid email",
//           password: "Invalid password",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] px-6">
//       <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">

//         {/* Left Side */}
//         <div className="hidden md:flex flex-col justify-between p-12 bg-slate-950 text-white relative overflow-hidden">
//           <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl"></div>

//           <div className="relative z-10">
//             <h1 className="text-5xl font-black italic tracking-tighter leading-none mb-6">
//               FiTz<span className="text-sky-500">.</span>
//             </h1>
//             <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[240px]">
//               Access your curated collection and personalized style dashboard.
//             </p>
//           </div>

//           <div className="relative z-10">
//             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-500 mb-4">
//               <span className="w-8 h-[1px] bg-sky-500"></span> Member Access
//             </div>
//             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
//               Refined. Minimal. Iconic. <br />
//               The standard for modern aesthetics.
//             </p>
//           </div>
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="p-10 md:p-16 flex flex-col justify-center">
//           <div className="mb-10 text-center md:text-left">
//             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
//               Login
//             </h2>
//             <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">
//               Please enter your credentials
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">

//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
//                 <FaEnvelope size={10} className="text-sky-600" /> Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="style@fitz.com"
//                 className={`w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none transition-all text-sm font-bold text-slate-900 ${
//                   errors.email ? "border-rose-500" : "border-slate-100 focus:border-sky-500"
//                 }`}
//               />
//               {errors.email && (
//                 <p className="text-[10px] text-rose-600 font-semibold ml-1">
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <div className="flex justify-between items-center px-1">
//                 <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
//                   <FaLock size={10} className="text-sky-600" /> Password
//                 </label>
//                 <Link
//                   to="/forgot-password"
//                   className="text-[9px] font-black uppercase text-slate-300 hover:text-sky-600 transition-colors tracking-widest"
//                 >
//                   Forgot?
//                 </Link>
//               </div>
//               <div className="relative">
//               <input
//                 type={showPassword?'text':'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className={`w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none transition-all text-sm font-bold text-slate-900 ${
//                   errors.password ? "border-rose-500" : "border-slate-100 focus:border-sky-500"
//                 }`}
//               />
//                <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 transition-colors"
//                 >
//                   {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
//                 </button>
//               </div>
               
//               {errors.password && (
//                 <p className="text-[10px] text-rose-600 font-semibold ml-1">
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3"
//             >
//               {loading ? "Authenticating..." : (
//                 <>
//                   Enter Dashboard <FaArrowRight size={10} />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Footer Link */}
//           <div className="mt-12 text-center">
//             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4">
//               Don't have an account?
//             </p>
//             <Link
//               to="/signup"
//               className="inline-flex items-center gap-2 text-sky-600 font-black uppercase tracking-[0.2em] text-[11px] group"
//             >
//               Create Account <FaFingerprint size={14} className="group-hover:scale-110 transition-transform" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;












import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaArrowRight, FaFingerprint,FaEye,FaEyeSlash } from "react-icons/fa";





import { GoogleLogin } from '@react-oauth/google';




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // 👈 NEW
  const[showPassword,setShowPassword]=useState(false)


 const handleGoogleLogin = async (credentialResponse) => {
  try {
    const res = await axios.post("http://localhost:8000/api/auth/google/", {
      provider: "google",
      access_token: credentialResponse.credential,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    toast.success("Logged in with Google!");
    window.location.href = "/";
  } catch (err) {
    console.error(err.response?.data || err.message);
    toast.error("Google login failed");
  }
};




  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login/", {
        email,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      toast.success("Welcome back to FiTz.");
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (err) {
      const data = err.response?.data;

      // Handle backend error messages
      if (data?.detail) {
        setErrors({
          email: " ",
          password: data.detail,
        });
      } else {
        setErrors({
          email: "Invalid email",
          password: "Invalid password",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] px-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-black italic tracking-tighter leading-none mb-6">
              FiTz<span className="text-sky-500">.</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[240px]">
              Access your curated collection and personalized style dashboard.
            </p>
            {/* <img
      src="https://www.pinterest.com/pin/1337074879282252/"   // replace with your actual image path
      alt="Fashion preview"
      className="w-56 h-auto rounded-xl shadow-lg object-cover"
    /> */}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-500 mb-4">
              <span className="w-8 h-[1px] bg-sky-500"></span> Member Access
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
              Refined. Minimal. Iconic. <br />
              The standard for modern aesthetics.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
              Login
            </h2>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">
              Please enter your credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <FaEnvelope size={10} className="text-sky-600" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="style@fitz.com"
                className={`w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none transition-all text-sm font-bold text-slate-900 ${
                  errors.email ? "border-rose-500" : "border-slate-100 focus:border-sky-500"
                }`}
              />
              {errors.email && (
                <p className="text-[10px] text-rose-600 font-semibold ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <FaLock size={10} className="text-sky-600" /> Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[9px] font-black uppercase text-slate-300 hover:text-sky-600 transition-colors tracking-widest"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
              <input
                 type={showPassword?'text':'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none transition-all text-sm font-bold text-slate-900 ${
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3"
            >
              {loading ? "Authenticating..." : (
                <>
                  Enter Dashboard <FaArrowRight size={10} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4">
              Don't have an account?
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-sky-600 font-black uppercase tracking-[0.2em] text-[11px] group"
            >
              Create Account <FaFingerprint size={14} className="group-hover:scale-110 transition-transform" />
            </Link>
            <div className="mt-6 flex justify-center">
  <GoogleLogin
    onSuccess={handleGoogleLogin}
    onError={() => toast.error("Google Sign In Failed")}
  />
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
