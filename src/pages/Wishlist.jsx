
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  const { user,token,
        wishlist,
        fetchWishlist,
        addToWishlist,
        addToCart,
        removeFromWishlist,
             } = useContext(UserContext);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return  <div className="flex flex-col items-center justify-center mt-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png"
          alt="Empty wishlist"
          className="w-32 mb-4 opacity-70"
        />
        <h2 className="text-xl font-semibold text-gray-600">
          Your wishlist is empty
        </h2>
      </div>;
  }

  const wishlistItems = wishlist?.items ?? [];

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png"
          alt="Empty wishlist"
          className="w-32 mb-4 opacity-70"
        />
        <h2 className="text-xl font-semibold text-gray-600">
          Your wishlist is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-sky-700 mb-6">My Wishlist</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.product}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-60 w-full object-cover"
            />
            <div className="p-2">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              <p className="mt-2 font-bold text-sky-700">₹{item.price}</p>

              <div className="flex justify-between mt-2">
                <button
                  onClick={() => {addToCart(item.product);removeFromWishlist(item.product);toast.success('Moved to cart')}}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <FaShoppingCart /> Add to Cart
                </button>

                <button
                  onClick={() => {removeFromWishlist(item.product);toast.info('Removed from wishlist')}}
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
