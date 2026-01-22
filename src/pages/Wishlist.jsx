
// import React, { useContext,useEffect } from "react";
// import { UserContext } from "../context/UserContext";
// import { FaTrash, FaShoppingCart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function Wishlist() {
//   const { user,token,
//         wishlist,
//         fetchWishlist,
//         addToWishlist,
//         addToCart,
//         removeFromWishlist,
//              } = useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(
//       ()=>{
//         if(!token){
//         toast.info('Please login first');
//         navigate('/login');
//     }
//       },[]
//     );

//   const wishlistItems = wishlist?.items ?? [];

//   if (wishlistItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center mt-20">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png"
//           alt="Empty wishlist"
//           className="w-32 mb-4 opacity-70"
//         />
//         <h2 className="text-xl font-semibold text-gray-600">
//           Your wishlist is empty
//         </h2>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold text-sky-700 mb-6">My Wishlist</h2>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {wishlistItems.map((item) => (
//           <div
//             key={item.product}
//             className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="h-60 w-full object-cover"
//             />
//             <div className="p-2">
//               <h3 className="font-semibold text-lg">{item.name}</h3>
//               <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
//               <p className="mt-2 font-bold text-sky-700">₹{item.price}</p>

//               <div className="flex justify-between mt-2">
//                 <button
//                   onClick={() => {addToCart(item.product);removeFromWishlist(item.product);toast.success('Moved to cart')}}
//                   className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
//                 >
//                   <FaShoppingCart /> Add to Cart
//                 </button>

//                 <button
//                   onClick={() => {removeFromWishlist(item.product);toast.info('Removed from wishlist')}}
//                   className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
//                 >
//                   <FaTrash /> Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Wishlist;





import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaTrash, FaShoppingBag, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  const { token, wishlist, addToCart, removeFromWishlist } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) navigate("/login");
  }, [token, navigate]);

  const wishlistItems = wishlist?.items ?? [];

  if (wishlistItems.length === 0) {
    return (
       <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Empty Curation</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-sky-600 underline">Explore Shop</button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-10">
          My <span className="text-rose-500">Wishlist</span>
        </h1>

        {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 5 on desktop for smaller size */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item.product}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Smaller Image Aspect Ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => {
                    removeFromWishlist(item.product);
                    toast.info("Removed");
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  <FaTrash size={10} />
                </button>
              </div>

              {/* Compact Content */}
              <div className="p-3 space-y-1">
                <h3 className="font-bold text-slate-900 text-[13px] truncate uppercase tracking-tight">
                  {item.name}
                </h3>
                <p className="font-black text-sky-600 text-sm">₹{item.price}</p>
                
                <button
                  onClick={() => {
                    addToCart(item.product);
                    removeFromWishlist(item.product);
                    toast.success("Added to Bag");
                  }}
                  className="w-full mt-2 bg-slate-900 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-sky-600 transition-colors"
                >
                  <FaShoppingBag size={10} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;