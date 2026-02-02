



// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import { 
//   FaShoppingCart, 
//   FaHeart, 
//   FaBars, 
//   FaTimes, 
//   FaUserShield,
//   FaHome,
//   FaInfoCircle,
//   FaPhoneAlt
// } from "react-icons/fa";

// function Navbar() {
//   const { user } = useContext(UserContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Handle scroll effect for glassmorphism
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => setIsOpen(false), [location]);

//   const navLinks = [
//     { name: "Home", path: "/", icon: <FaHome /> },
//     { name: "Cart", path: "/cart", icon: <FaShoppingCart /> },
//     { name: "Wishlist", path: "/wishlist", icon: <FaHeart /> },
//     { name: "About", path: "/about", icon: <FaInfoCircle /> },
//     // { name: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
//   ];

//   return (
//     <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
//       scrolled ? "bg-white/80 backdrop-blur-md shadow-lg py-2" : "bg-white py-4"
//     }`}>
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
//         {/* --- Logo --- */}
//         <Link to="/" className="group flex items-center gap-1">
//           <span className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-sky-600 transition-colors">
//             FiTz<span className="text-sky-600">.</span>
//           </span>
//         </Link>

//         {/* --- Desktop Navigation --- */}
//         <ul className="hidden md:flex items-center space-x-1 lg:space-x-4">
//           {navLinks.map((link) => (
//             <li key={link.name}>
//               <Link
//                 to={link.path}
//                 className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
//                   location.pathname === link.path
//                     ? "text-sky-600 bg-sky-50"
//                     : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
//                 }`}
//               >
//                 {link.icon}{link.name} 
//               </Link>
//             </li>
//           ))}

//           {/* Admin Quick Link */}
//           {user?.is_staff && (
//             <li>
//               <Link
//                 to="/admin"
//                 className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-sky-600 transition-all shadow-md active:scale-95"
//               >
//                 <FaUserShield className="text-sky-400" /> Admin
//               </Link>
//             </li>
//           )}
//         </ul>

//         {/* --- Right Actions (Auth) --- */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
//               <div className="hidden lg:block text-right">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Welcome back</p>
//                 <p className="text-xs font-black text-slate-800 uppercase">{user.name}</p>
//               </div>
//               <button
//                 onClick={() => navigate("/user")}
//                 className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-black flex items-center justify-center shadow-lg shadow-sky-200 hover:scale-105 transition-all active:scale-95"
//               >
//                 {user.name ? user.name[0].toUpperCase() : "?"}
//               </button>
//             </div>
//           ) : (
//             <button 
//               onClick={() => navigate('/login')}
//               className="bg-slate-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
//             >
//               SIGN IN
//             </button>
//           )}

//           {/* Mobile Toggle */}
//           <button
//             className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* --- Mobile Menu --- */}
//       <div className={`fixed inset-x-0 top-[100%] bg-white border-t border-slate-100 shadow-2xl transition-all duration-300 md:hidden ${
//         isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
//       }`}>
//         <div className="p-6 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className={`flex items-center gap-4 p-4 rounded-2xl text-base font-bold transition-all ${
//                 location.pathname === link.path
//                   ? "bg-sky-50 text-sky-600"
//                   : "text-slate-600 hover:bg-slate-50"
//               }`}
//             >
//               <span className="text-lg opacity-70">{link.icon}</span>
//               {link.name}
//             </Link>
//           ))}
          
//           {user?.is_staff && (
//             <Link
//               to="/admin"
//               className="flex items-center gap-4 p-4 rounded-2xl text-sky-600 bg-sky-50 font-bold"
//             >
//               <FaUserShield className="text-lg" /> Admin Dashboard
//             </Link>
//           )}
//         </div>
//       </div>
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
  FaUser
} from "react-icons/fa";

function Navbar() {
  const { user, cart, wishlist } = useContext(UserContext); // Added cart/wishlist for counts
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Cart", path: "/cart", icon: <FaShoppingCart />, count: cart?.items?.length },
    { name: "Wishlist", path: "/wishlist", icon: <FaHeart />, count: wishlist?.items?.length },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-white py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* --- Logo --- */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900">
              FiTz<span className="text-sky-600">.</span>
            </span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    location.pathname === link.path
                      ? "text-sky-600 bg-sky-50"
                      : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  {link.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {link.count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* --- Right Actions --- */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Admin Badge (Desktop) */}
            {user?.is_staff && (
              <Link to="/admin" className="hidden lg:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-sky-600 transition-all">
                <FaUserShield /> Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={() => navigate("/user")}
                className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-sky-600 text-white font-black flex items-center justify-center text-sm">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <span className="hidden sm:block text-xs font-bold text-slate-700 uppercase tracking-tight">
                  {user.name?.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="bg-slate-900 text-white text-[10px] md:text-xs font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-xl hover:bg-sky-600 transition-all active:scale-95"
              >
                SIGN IN
              </button>
            )}

            {/* Hamburger Toggle */}
            <button
              className="md:hidden p-2 text-slate-900"
              onClick={() => setIsOpen(true)}
            >
              <FaBars size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Drawer (Slide in from Right) --- */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Content */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[120] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-black tracking-tighter uppercase">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <FaTimes size={24} />
            </button>
          </div>

          <div className="space-y-2 flex-grow">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                  location.pathname === link.path ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                </div>
                {link.count > 0 && (
                  <span className="bg-sky-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {link.count}
                  </span>
                )}
              </Link>
            ))}
            
            {user?.is_staff && (
              <Link to="/admin" className="flex items-center gap-4 p-4 rounded-2xl text-rose-600 bg-rose-50 font-bold">
                <FaUserShield size={18} /> Admin Dashboard
              </Link>
            )}
          </div>

          {/* Bottom Profile Section in Mobile */}
          {user && (
             <div className="mt-auto p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase">{user.name}</p>
                  <Link to="/user" className="text-[10px] font-bold text-sky-600 uppercase">View Profile</Link>
                </div>
             </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;