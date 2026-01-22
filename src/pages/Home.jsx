
// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { UserContext } from "../context/UserContext";
// import axios from "axios";
// import FashionCarousel from "../components/FashionCarousel";
// import BuyNow from "../components/BuyNow";
// import { toast } from "react-toastify";

// function Home() {
//   const {
//     user,
//     cart,
//     addToCart,
//     token,
//     removeFromCart,
//     wishlist, addToWishlist,removeFromWishlist
//   } = useContext(UserContext);

//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const navigate = useNavigate();

//  useEffect(() => {
//   axios
//     .get("http://localhost:8000/api/products/")
//     .then((res) => setProducts(res.data))
//     .catch((err) => console.error(err));
// }, []);

//   const handleAddToCart = (productId) => {
//      if(!token){
//           toast.info('Please login first');
//           navigate('/login');
//      }

//     const isInCart = cart.items?.some((item) => item.product === productId);
//     if (isInCart) {
//       removeFromCart(productId);
//       toast.info('Removed from cart')
//     } else {
//        addToCart(productId);
//   toast.success("Added to cart");
//     }
//   };

//   const handleWishlistToggle = (productId) => {
//     if (!token) {
//       toast.error("Please login to manage wishlist");
//       navigate("/login");
//       return;
//     }

//     const isWishlisted = wishlist?.items?.some(
//         (item) => item.product === productId
//     );

//     if (isWishlisted) {
//       removeFromWishlist(productId);
//       toast.info('Removed from wishlist')
//     } else {
//       addToWishlist(productId);
//        toast.success('Added to wishlist')
//     }
//   };

//   const filteredProducts = products.filter((p) => {
//     const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory =
//       categoryFilter === "all"
//         ? true
//         : p.category.toLowerCase() === categoryFilter;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="p-6" >
//       <FashionCarousel />
//       <h2 className="text-3xl font-bold text-center mb-6 text-sky-700"  id='products' >
//         Our Products
//       </h2>

//       {/* Search */}
//       <div className="flex justify-center mb-4" >
//         <div className="flex items-center border border-sky-300 rounded-full px-4 py-2 w-full md:w-1/2">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search products..."
//             className="flex-grow outline-none px-2 text-gray-600"
//           />
//           <span className="text-sky-600 text-lg">🔍</span>
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div className="flex justify-center gap-4 mb-6">
//         {["all", "men", "women"].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategoryFilter(cat)}
//             className={`px-4 py-2 rounded font-medium ${
//               categoryFilter === cat
//                 ? "bg-sky-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-sky-400 hover:text-white"
//             }`}
//           >
//             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => {
//              const isWishlisted = wishlist?.items?.some(
//               (item) => item.product === product.id
//             );
//             const isInCart = cart?.items?.some(
//               (item) => item.product === product.id
//             );

//             return (
//               <div
//                 key={product.id}
//                 className="bg-white p-4 shadow-md rounded-lg text-center relative hover:shadow-xl transition-shadow"
//               >
//                 <div
//                   className="absolute top-3 right-3 text-2xl cursor-pointer transition-transform hover:scale-110"
//                   onClick={() => handleWishlistToggle(product.id)}
//                 >
//                   {isWishlisted ? (
//                     <FaHeart className="text-pink-600" />
//                   ) : (
//                     <FaRegHeart className="text-gray-400 hover:text-pink-500" />
//                   )}
//                 </div>

//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-60 w-full object-cover rounded"
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 />
//                 <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
//                 <p className="text-gray-600">{product.description}</p>
//                 <p className="font-semibold mt-1">₹{product.price}</p>

//                 <div className="flex gap-2 mt-3">
//                   <button
//                     className={`flex-1 text-white py-2 rounded transition ${
//                       isInCart
//                         ? "bg-orange-600 hover:bg-orange-700"
//                         : "bg-sky-600 hover:bg-sky-700"
//                     }`}
//                     onClick={() => handleAddToCart(product.id)}
//                   >
//                     {isInCart ? "Remove" : "Add to Cart"}
//                   </button>

//                    <button
//                       onClick={() => navigate("/checkout", { state: { product } })}
//                       className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//                    >
//                           Buy Now
//                    </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center col-span-4 text-gray-500">
//             No products found.                                 
//           </p>
//         )}
//       </div>                  
                            
      
//     </div>
//   );
// }
// export default Home;





import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaSearch, FaShoppingCart, FaBolt } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import FashionCarousel from "../components/FashionCarousel";
import { toast } from "react-toastify";

function Home() {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const {
    user,
    cart,
    addToCart,
    token,
    removeFromCart,
    wishlist,
    addToWishlist,
    removeFromWishlist
  } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (productId) => {
    if (!token) {
      toast.info('Please login first');
      navigate('/login');
      return;
    }

    const isInCart = cart.items?.some((item) => item.product === productId);
    if (isInCart) {
      removeFromCart(productId);
      toast.info('Removed from cart');
    } else {
      addToCart(productId);
      toast.success("Added to cart");
    }
  };

  const handleWishlistToggle = (productId) => {
    if (!token) {
      toast.error("Please login to manage wishlist");
      navigate("/login");
      return;
    }

    const isWishlisted = wishlist?.items?.some((item) => item.product === productId);
    if (isWishlisted) {
      removeFromWishlist(productId);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(productId);
      toast.success('Added to wishlist');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" ? true : p.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#fcfcfd] min-h-screen pb-20">
      <FashionCarousel />

      <div className="max-w-[1400px] mx-auto px-4" id="products">
        {/* --- Header Section (Made more compact) --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
              The <span className="text-sky-600">Feed</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
             {/* Search Input (Smaller) */}
            <div className="relative group w-full sm:w-60">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-sky-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* --- Category Tabs (Smaller) --- */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-100">
          {["all", "men", "women"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-500 hover:text-sky-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- Product Grid (Increased to 5 columns on large screens) --- */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist?.items?.some((item) => item.product === product.id);
              const isInCart = cart?.items?.some((item) => item.product === product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image (Reduced height/aspect ratio) */}
                  <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Tiny Wishlist Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleWishlistToggle(product.id); }}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-rose-500 text-xs" />
                      ) : (
                        <FaRegHeart className="text-slate-400 text-xs" />
                      )}
                    </button>
                  </div>

                  {/* Content (Compressed padding and text) */}
                  <div className="p-3 flex flex-col flex-grow">
                    <div className="mb-1">
                       <h3 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-sky-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm font-black text-slate-900">₹{product.price}</p>
                    </div>

                    {/* Action Row */}
                    <div className="flex gap-1.5 mt-2">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-tighter transition-all ${
                          isInCart
                            ? "bg-rose-50 text-rose-600 border border-rose-100"
                            : "bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        <FaShoppingCart size={10} />
                        {isInCart ? "Drop" : "Cart"}
                      </button>

                      <button
                        onClick={() => navigate("/checkout", { state: { product } })}
                        className="w-8 h-8 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors"
                      >
                        <FaBolt size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-400 text-sm italic">
            No products match your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;