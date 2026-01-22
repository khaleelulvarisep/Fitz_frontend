
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





// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTrash } from "react-icons/fa";
// import { UserContext } from "../context/UserContext";
// import { toast } from "react-toastify";

// function Cart() {
 
//        useEffect(() => {
//           window.scrollTo(0, 0);
//         }, []);
//   const { cart, updateCartItem, removeFromCart } = useContext(UserContext);
//   const token = localStorage.getItem("access");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       toast.info("Please login first");
//       navigate("/login");
//     }
//   }, []);

//   const cartItems = cart?.items ?? [];

//   const handleDelete = (productId) => {
//     removeFromCart(productId);
//     toast.warn("Item deleted");
//   };

//   const increaseQty = (item) => {
//     updateCartItem(item.product, item.quantity + 1);
//     toast.success("Quantity changed");
//   };

//   const decreaseQty = (item) => {
//     if (item.quantity > 1) {
//       updateCartItem(item.product, item.quantity - 1);
//       toast.success("Quantity changed");
//     }
//   };

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
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
//               <p className="mt-1 font-semibold text-sky-600">₹{item.price}</p>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => decreaseQty(item)}
//                 className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
//               >
//                 -
//               </button>
//               <span className="px-2">{item.quantity}</span>
//               <button
//                 onClick={() => increaseQty(item)}
//                 className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
//               >
//                 +
//               </button>
//             </div>

//             <button
//               onClick={() => handleDelete(item.product)}
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
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaChevronLeft, FaShoppingBag } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cart, updateCartItem, removeFromCart } = useContext(UserContext);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.info("Please login first");
      navigate("/login");
    }
  }, [token, navigate]);

  const cartItems = cart?.items ?? [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <FaShoppingBag className="text-slate-200 text-4xl" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-2">
          Your Bag is Empty
        </h2>
        <p className="text-slate-400 text-sm mb-8">Items stay in your bag for 30 days. Let's fill it up.</p>
        <Link 
          to="/" 
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200"
        >
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="bg-[#fcfcfd] min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-sky-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
              Review your selection
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
              Shopping <span className="text-sky-600">Bag</span>
            </h1>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-600 transition-colors"
          >
            <FaChevronLeft size={8}/> Continue Browsing
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col sm:flex-row items-center bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                {/* Product Image */}
                <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 mt-4 sm:mt-0 sm:ml-8 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-slate-900 uppercase tracking-tight text-lg">
                        {item.product_name}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Premium Selection
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.product);
                        toast.warn("Removed from bag");
                      }}
                      className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                      <button
                        onClick={() => item.quantity > 1 && updateCartItem(item.product, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-colors"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="w-10 text-center text-sm font-black text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItem(item.product, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-colors"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>

                    <p className="font-black text-xl text-slate-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50">
              <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-8 border-b border-slate-50 pb-4">
                Summary
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                  <span className="font-black text-slate-900">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                  <span className="text-emerald-500 font-black uppercase text-[10px] tracking-widest">Calculated at Checkout</span>
                </div>
                <div className="border-t border-slate-50 pt-4 flex justify-between">
                  <span className="text-slate-900 font-black uppercase tracking-widest text-xs">Estimated Total</span>
                  <span className="text-2xl font-black text-sky-600 tracking-tighter italic">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                Go to Checkout
              </button>
              
              <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-6">
                Complimentary 7-day returns on all orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;