

// import React, { useState,useContext } from "react";
// import "../App.css"
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// function Navbar() {
//   const {user} = useContext(UserContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
  
//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      
//         <div className="text-4xl font-bold text-sky-600">
//           <Link to="/">FiTz.</Link>
//         </div>

   
//         <ul className="hidden md:flex flex-1 justify-center space-x-8 text-gray-700 font-medium">
//           <li>
//             <Link to="/" className="hover:text-sky-600">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" className="hover:text-sky-600">
//               Cart
//             </Link>
//           </li>
//           <li>
//             <Link to="/wishlist" className="hover:text-sky-600">
//               Wishlist
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="hover:text-sky-600">
//               About
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="hover:text-sky-600">
//               Contact
//             </Link>
//           </li>
//             {user?.is_staff&& (
//               <li>
//           <Link
//             to="/admin"
//             className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
//           >
//             Admin
//           </Link>
//           </li>
//         )}
        
//         </ul>

      
//         {user? (
//           <button
//             onClick={() => navigate("/user")}
//             className=" ml-4 w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-md hover:bg-blue-700 transition"
//           >
//             {user.name? user.name[0].toUpperCase() : "?"}
//           </button>
//         ):<button 
//                onClick={()=>{navigate('/login')}}
//               className="flex bg-sky-600 text-white py-2 px-2 rounded">Login/signUp</button>}

 
//         <div
//           className="md:hidden text-2xl text-sky-600 cursor-pointer ml-2"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           ☰
//         </div>
//       </div>

//       {isOpen && (
//         <div className="md:hidden bg-sky-50 border-t border-sky-200 px-6 py-4 space-y-4">
//           <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
//             <li>
//               <Link to="/" className="hover:text-sky-600">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/cart" className="hover:text-sky-600">
//                 Cart
//               </Link>
//             </li>
//             <li>
//               <Link to="/wishlist" className="hover:text-sky-600">
//                 Wishlist
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="hover:text-sky-600">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:text-sky-600">
//                 Contact
//               </Link>
//             </li>
//             {user && (
//               <li>
//                 <button
//                   onClick={() => navigate("/user")}
//                   className="hover:text-sky-600"
//                 >
//                  Settings
//                 </button>
//               </li>
//             )}
//              {user?.isAdmin && (
//               <li>
//           <Link
//             to="/admin"
//             className="hover:text-sky-600"
//           >
//             Admin
//           </Link>
//           </li>
//         )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;




import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { 
  FaShoppingCart, 
  FaHeart, 
  FaBars, 
  FaTimes, 
  FaUserShield,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt
} from "react-icons/fa";

function Navbar() {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Cart", path: "/cart", icon: <FaShoppingCart /> },
    { name: "Wishlist", path: "/wishlist", icon: <FaHeart /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    // { name: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-md shadow-lg py-2" : "bg-white py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- Logo --- */}
        <Link to="/" className="group flex items-center gap-1">
          <span className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-sky-600 transition-colors">
            FiTz<span className="text-sky-600">.</span>
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <ul className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  location.pathname === link.path
                    ? "text-sky-600 bg-sky-50"
                    : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
                }`}
              >
                {link.icon}{link.name} 
              </Link>
            </li>
          ))}

          {/* Admin Quick Link */}
          {user?.is_staff && (
            <li>
              <Link
                to="/admin"
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-sky-600 transition-all shadow-md active:scale-95"
              >
                <FaUserShield className="text-sky-400" /> Admin
              </Link>
            </li>
          )}
        </ul>

        {/* --- Right Actions (Auth) --- */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="hidden lg:block text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Welcome back</p>
                <p className="text-xs font-black text-slate-800 uppercase">{user.name}</p>
              </div>
              <button
                onClick={() => navigate("/user")}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-black flex items-center justify-center shadow-lg shadow-sky-200 hover:scale-105 transition-all active:scale-95"
              >
                {user.name ? user.name[0].toUpperCase() : "?"}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-slate-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
            >
              SIGN IN
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <div className={`fixed inset-x-0 top-[100%] bg-white border-t border-slate-100 shadow-2xl transition-all duration-300 md:hidden ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
      }`}>
        <div className="p-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-4 p-4 rounded-2xl text-base font-bold transition-all ${
                location.pathname === link.path
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="text-lg opacity-70">{link.icon}</span>
              {link.name}
            </Link>
          ))}
          
          {user?.is_staff && (
            <Link
              to="/admin"
              className="flex items-center gap-4 p-4 rounded-2xl text-sky-600 bg-sky-50 font-bold"
            >
              <FaUserShield className="text-lg" /> Admin Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;