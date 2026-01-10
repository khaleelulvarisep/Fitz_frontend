


// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";

// function Wishlist() {
//   const { user, removeFromWishlist, addToCart } = useContext(UserContext);
//   const navigate = useNavigate();

//   if (!user) {
//     navigate("/login");
//     return null;
//   }

//   const wishlist = user?.wishlist || [];

//   const handleMoveToCart = (product) => {
//     addToCart({
//       productId: product.productId,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       description: product.description,
//       quantity: 1,
//     });
//     removeFromWishlist(product.productId);
//     alert(`${product.name} moved to cart!`);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-center mb-6 text-sky-700 flex items-center justify-center gap-2">
//         My Wishlist
//       </h2>

//       {wishlist.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {wishlist.map((product) => (
//             <div
//               key={product.productId}
//               className="bg-white p-4 shadow-md rounded-lg text-center hover:shadow-xl transition-shadow"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="h-60 w-full object-cover rounded"
//               />
//               <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
//               <p className="text-gray-600">{product.description}</p>
//               <p className="font-semibold mt-1">₹{product.price}</p>

//               <div className="flex gap-2 mt-3">
//                 <button
//                   className="flex-1 bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
//                   onClick={() => handleMoveToCart(product)}
//                 >
//                   Move to Cart
//                 </button>
//                 <button
//                   className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
//                   onClick={() => removeFromWishlist(product.productId)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 text-lg">
//           Your wishlist is empty 
//         </p>
//       )}
//     </div>
//   );
// }

// export default Wishlist;










// import React, { useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import { FaTrash, FaShoppingCart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function Wishlist() {
//   const { user, addToCart, addToWishlist } = useContext(UserContext);
//   const navigate = useNavigate();

//   // redirect if not logged in
//   if (!user) {
//     navigate("/login");
//     return null;
//   }

//   const wishlistItems = user.wishlist || [];

//   // handle "Add to Cart" button → add to cart & remove from wishlist
//   const handleAddToCartFromWishlist = async (product) => {
//     await addToCart(product);
//     await addToWishlist(product); // this toggles it off (removes)
//   };

//   // handle "Remove" button
//   const handleRemoveFromWishlist = async (product) => {
//     await addToWishlist(product); // toggles removal
//   };

//   // if empty
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

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {wishlistItems.map((item) => (
//           <div
//             key={item.productId}
//             className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="h-48 w-full object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">{item.name}</h3>
//               <p className="text-gray-600 text-sm line-clamp-2">
//                 {item.description}
//               </p>
//               <p className="mt-2 font-bold text-sky-700">₹{item.price}</p>

//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => handleAddToCartFromWishlist(item)}
//                   className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
//                 >
//                   <FaShoppingCart /> Add to Cart
//                 </button>

//                 <button
//                   onClick={() => handleRemoveFromWishlist(item)}
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















import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  const { user, moveFromWishlistToCart, removeFromWishlist } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
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

  const wishlistItems = user.wishlist || [];

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
            key={item.productId}
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
                  onClick={() => {moveFromWishlistToCart(item);toast.success('Moved to cart')}}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <FaShoppingCart /> Add to Cart
                </button>

                <button
                  onClick={() => {removeFromWishlist(item.productId);toast.info('Removed from wishlist')}}
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
