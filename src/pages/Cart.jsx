
// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTrash } from "react-icons/fa";
// import { UserContext } from "../context/UserContext";
// import { toast } from "react-toastify";

// function Cart() {
//   const { cart,updateCartItem, removeFromCart } = useContext(UserContext);
//   const token=localStorage.getItem("access");

//   const navigate = useNavigate();
//   useEffect(
//     ()=>{
//       if(!token){
//       toast.info('Please login first');
//       navigate('/login');
//   }
//     },[]
//   );
  

// const cartItems = cart?.items ?? [];
//   const handleDelete = (productId) => {
//     removeFromCart(productId);
//   };

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * (item.quantity || 1),
//     0
//   );

//   if (cartItems.length === 0)
//     return (
//       <div className="flex flex-col items-center justify-center mt-20">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
//           alt="Empty cart"
//           className="w-32 mb-4 opacity-70"
//         />
//         <h2 className="text-xl font-semibold text-gray-600">
//           Your cart is empty
//         </h2>
//       </div>
//     );

//   return (
//     <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
//       <div className="md:col-span-2 space-y-4">
//         <h2 className="text-2xl font-bold text-sky-700 mb-4">My Cart</h2>

//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
//           >
//             <img
//               src={item.image}
//               alt={item.product_name}
//               className="h-24 w-24 object-cover rounded-md"
//             />
//             <div className="flex-1 ml-4">
//               <h3 className="font-bold text-lg">{item.product_name}</h3>
//               {/* <p className="text-gray-600 text-sm">{item.description}</p> */}
//               <p className="mt-1 font-semibold text-sky-600">₹{item.price}</p>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => {updateCartItem(item.product,item.quantity-1);toast.success('Quantity chenged')}}
//                 className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
//               >
//                 -

//               </button>
//               <span className="px-2">{item.quantity}</span>
//               <button
//                 onClick={() => {updateCartItem(item.product,item.quantity+1);toast.success('Quantity chenged')}}
//                 className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
//               >
//                 +
//               </button>
//             </div>

//             <button
//               onClick={() => {handleDelete(item.product);toast.warn('Item deleted')}}
//               className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//             >
//               <FaTrash />
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-6 h-fit sticky top-20">
//         <h2 className="text-2xl font-bold text-sky-700 mb-4">Order Summary</h2>
//         <p className="text-lg font-medium text-gray-700 mb-2">
//           Total Items: {cartItems.length}
//         </p>
//         <p className="text-xl font-bold text-green-600 mb-6">
//           Total Price: ₹{totalPrice}
//         </p>
//         <button
//           className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
//           onClick={() => navigate("/checkout")}
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Cart;





import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Cart() {
  const { cart, updateCartItem, removeFromCart } = useContext(UserContext);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.info("Please login first");
      navigate("/login");
    }
  }, []);

  const cartItems = cart?.items ?? [];

  const handleDelete = (productId) => {
    removeFromCart(productId);
    toast.warn("Item deleted");
  };

  const increaseQty = (item) => {
    updateCartItem(item.product, item.quantity + 1);
    toast.success("Quantity changed");
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item.product, item.quantity - 1);
      toast.success("Quantity changed");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-32 mb-4 opacity-70"
        />
        <h2 className="text-xl font-semibold text-gray-600">
          Your cart is empty
        </h2>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">My Cart</h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.product_name}
              className="h-24 w-24 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-bold text-lg">{item.product_name}</h3>
              <p className="mt-1 font-semibold text-sky-600">₹{item.price}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => decreaseQty(item)}
                className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                -
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={() => increaseQty(item)}
                className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleDelete(item.product)}
              className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 h-fit sticky top-20">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Order Summary</h2>
        <p className="text-lg font-medium text-gray-700 mb-2">
          Total Items: {cartItems.length}
        </p>
        <p className="text-xl font-bold text-green-600 mb-6">
          Total Price: ₹{totalPrice}
        </p>
        <button
          className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
