
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { FaHeart, FaRegHeart, FaChevronLeft, FaShieldAlt, FaTruck, FaUndoAlt } from "react-icons/fa";
import Footer from "./Footer";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const navigate = useNavigate();
  const { cart, addToCart, token, removeFromCart, addToWishlist, removeFromWishlist, wishlist } = useContext(UserContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.fitzs.online/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-sky-600"></div>
      </div>
    );
  }

  const isInCart = cart?.items?.some((item) => item.product === product.id);
  const isWishlisted = wishlist?.items?.some((item) => item.product === product.id);

  const handleAddToCart = () => {
    if (!token) {
      toast.info('Please login first');
      navigate('/login');
      return;
    }
    isInCart ? removeFromCart(product.id) : addToCart(product.id);
    toast.success(isInCart ? 'Removed from cart' : 'Added to cart');
  };

  const handleWishlistToggle = () => {
    if (!token) {
      toast.error("Please login to manage wishlist");
      navigate("/login");
      return;
    }
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        {/* Main Grid: Image takes 5 columns, Info takes 7 columns */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- Smaller Image Section (5 Columns) --- */}
          <div className="lg:col-span-5 relative group">
            <div className="aspect-square overflow-hidden rounded-3xl bg-slate-50 shadow-inner border border-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <button
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
            >
              {isWishlisted ? (
                <FaHeart className="text-rose-500 text-lg" />
              ) : (
                <FaRegHeart className="text-slate-400 text-lg" />
              )}
            </button>
          </div>

          {/* --- Info Section (7 Columns) --- */}
          <div className="lg:col-span-7 flex flex-col pt-2">
            <span className="text-sky-600 text-[10px] font-black uppercase tracking-widest mb-2">
              {product.category || "New Collection"}
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
              <span className="text-sm font-medium text-slate-400 line-through">₹{Math.floor(product.price * 1.5)}</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">SAVE 33%</span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-lg">
              {product.description || "Premium quality build with attention to every detail. Designed to blend perfectly with your daily lifestyle."}
            </p>

            {/* Actions */}
            <div className="flex gap-3 max-w-md mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-[1.5] py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg ${
                  isInCart
                    ? "bg-rose-50 text-rose-600 border border-rose-100"
                    : "bg-slate-900 text-white hover:bg-sky-600"
                }`}
              >
                {isInCart ? "Drop from Cart" : "Add to Cart"}
              </button>
              <div className="flex-1">
               <button
                        onClick={() => navigate("/checkout", { state: { product } })}
    className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all active:scale-[0.98] shadow-lg shadow-sky-200"
  >
    Buy Now
  </button>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-4">
                <FaTruck className="text-sky-500 text-sm" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fast Delivery across India</span>
              </div>
              <div className="flex items-center gap-4">
                <FaUndoAlt className="text-sky-500 text-sm" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">7 Day Exchange Policy</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-600"
            >
              <FaChevronLeft size={8} /> Back to Products
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default ProductDetails;