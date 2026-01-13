
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import FashionCarousel from "../components/FashionCarousel";
import Footer from "./Footer";
import BuyNow from "../components/BuyNow";
import { toast } from "react-toastify";

function Home() {
  const {
    user,
    cart,
    addToCart,
    token,
    removeFromCart,
    wishlist, addToWishlist,removeFromWishlist
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
     if(!token){
          toast.info('Please login first');
          navigate('/login');
     }

    const isInCart = cart.items?.some((item) => item.product === productId);
    if (isInCart) {
      removeFromCart(productId);
      toast.info('Removed from cart')
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

    const isWishlisted = wishlist?.items?.some(
        (item) => item.product === productId
    );

    if (isWishlisted) {
      removeFromWishlist(productId);
      toast.info('Removed from wishlist')
    } else {
      addToWishlist(productId);
       toast.success('Added to wishlist')
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all"
        ? true
        : p.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6" >
      <FashionCarousel />
      <h2 className="text-3xl font-bold text-center mb-6 text-sky-700"  id='products' >
        Our Products
      </h2>

      {/* Search */}
      <div className="flex justify-center mb-4" >
        <div className="flex items-center border border-sky-300 rounded-full px-4 py-2 w-full md:w-1/2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-grow outline-none px-2 text-gray-600"
          />
          <span className="text-sky-600 text-lg">🔍</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6">
        {["all", "men", "women"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded font-medium ${
              categoryFilter === cat
                ? "bg-sky-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-sky-400 hover:text-white"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
             const isWishlisted = wishlist?.items?.some(
              (item) => item.product === product.id
            );
            const isInCart = cart?.items?.some(
              (item) => item.product === product.id
            );

            return (
              <div
                key={product.id}
                className="bg-white p-4 shadow-md rounded-lg text-center relative hover:shadow-xl transition-shadow"
              >
                <div
                  className="absolute top-3 right-3 text-2xl cursor-pointer transition-transform hover:scale-110"
                  onClick={() => handleWishlistToggle(product.id)}
                >
                  {isWishlisted ? (
                    <FaHeart className="text-pink-600" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-pink-500" />
                  )}
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-60 w-full object-cover rounded"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-semibold mt-1">₹{product.price}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    className={`flex-1 text-white py-2 rounded transition ${
                      isInCart
                        ? "bg-orange-600 hover:bg-orange-700"
                        : "bg-sky-600 hover:bg-sky-700"
                    }`}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {isInCart ? "Remove" : "Add to Cart"}
                  </button>

                  <BuyNow product={product} />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-4 text-gray-500">
            No products found.                                 
          </p>
        )}
      </div>                  
                            
      <Footer />
    </div>
  );
}
export default Home;
