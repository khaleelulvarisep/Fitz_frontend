
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import BuyNow from "../components/BuyNow";
import Footer from "./Footer";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart, removeFromCart, addToWishlist, removeFromWishlist } =
    useContext(UserContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  const isInCart = user?.cart?.some((item) => item.productId === product.id);
  const isWishlisted = user?.wishlist?.some(
    (item) => item.productId === product.id
  );

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (isInCart) {
      removeFromCart(product.id);
      toast.success('Removed from cart')
    } else {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1,
      });
      toast.success('Added to cart')
    }
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast.error("Please login to manage wishlist");
      navigate("/login");
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      });
      toast.success('Added to wishlist')
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg shadow-lg w-full h-[450px] object-cover"
          />
          <div
            className="absolute top-4 right-4 text-3xl cursor-pointer"
            onClick={handleWishlistToggle}
          >
            {isWishlisted ? (
              <FaHeart className="text-pink-600" />
            ) : (
              <FaRegHeart className="text-gray-400 hover:text-pink-500" />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-3 text-sky-700">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4 text-gray-800">
            ₹{product.price}
          </p>

          <div className="flex gap-3">
            <button
              className={`flex-1 py-2 rounded text-white transition ${
                isInCart
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-sky-600 hover:bg-sky-700"
              }`}
              onClick={handleAddToCart}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            <BuyNow product={product} />
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 text-sky-600 hover:underline"
          >
            ← Back to Products
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;
