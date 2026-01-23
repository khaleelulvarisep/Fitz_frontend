// import React from "react";
// import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className="bg-sky-700 text-white py-8 mt-10">
//       <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
       
//         <div>
//           <h2 className="text-2xl font-bold mb-3">FiTz.</h2>
//           <p className="text-gray-200">
//             Discover the latest trends in fashion. Your style, your statement!
//           </p>
//         </div>

        
//         <div>
//           <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
//           <ul className="space-y-2">
//             <li>
//               <Link to="/" className="hover:text-yellow-300 transition">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/wishlist" className="hover:text-yellow-300 transition">
//                 Wishlist
//               </Link>
//             </li>
//             <li>
//               <Link to="/cart" className="hover:text-yellow-300 transition">
//                 Cart
//               </Link>
//             </li>
//              <li>
//               <Link to="/about" className="hover:text-yellow-300 transition">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:text-yellow-300 transition">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>

        
//         <div>
//           <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
//           <div className="flex space-x-4">
//             <a href="#" className="hover:text-yellow-300 transition text-2xl">
//               <FaFacebook />
//             </a>
//             <a href="#" className="hover:text-yellow-300 transition text-2xl">
//               <FaInstagram />
//             </a>
//             <a href="#" className="hover:text-yellow-300 transition text-2xl">
//               <FaTwitter />
//             </a>
//           </div>
//         </div>
//       </div>

      
//       <div className="text-center mt-6 border-t border-sky-500 pt-4 text-gray-200 text-sm">
//         © {new Date().getFullYear()} FiTz. All Rights Reserved.
//       </div>
//     </footer>
//   );
// }

// export default Footer;




import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl font-black tracking-tighter italic uppercase">
              FiTz<span className="text-sky-500">.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-loose max-w-sm">
              We redefine the modern wardrobe with a focus on sustainable elegance and high-performance style. Join our journey toward conscious fashion.
            </p>
            <div className="flex space-x-5 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-950 transition-all duration-300">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-950 transition-all duration-300">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-950 transition-all duration-300">
                <FaTwitter size={14} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-500">Navigation</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-slate-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/wishlist" className="text-sm text-slate-300 hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="text-sm text-slate-300 hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Links Column 2 (Newsletter Style) */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-500">Newsletter</h3>
            <p className="text-sm text-slate-400">Subscribe to get early access to new drops.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-sky-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} FiTz Collective. All Rights Reserved.
          </p>
          
          <div className="flex gap-8">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-white">Privacy Policy</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-white">Terms of Service</p>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all"
          >
            Back to top 
            <span className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <FaArrowUp size={10} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;