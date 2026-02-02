


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
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://www.fitzs.online/api/products/", {
        params: {
          search: search,
          category: categoryFilter,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProducts();
}, [search, categoryFilter]);

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
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map((product) => {
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