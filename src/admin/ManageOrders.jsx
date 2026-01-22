
// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { toast } from "react-toastify";
// import api from "../api/axios";

// function ManageOrders() {
//   const { orders, users, loading, handleStatusChange } = useContext(AdminContext);
//   const [selectedOrder, setSelectedOrder] = useState(null);


//   const closeModal = () => setSelectedOrder(null);

//   if (loading) return <h2 className="text-center mt-10 text-lg">Loading orders...</h2>;
//   if (!orders || orders.length === 0)
//     return <p className="text-center text-sky-500">No orders found.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-sky-800 mb-6 text-center">Manage Orders</h1>

//       <div className="grid gap-6">
//         {orders.map((order) => {
//           const user = users.find((u) => u.id.toString() === order.user.toString());
//           return (
//             <div
//               key={order.id}
//               className="border rounded-xl shadow p-5 bg-white hover:shadow-lg transition"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     order.status.toLowerCase() === "placed"
//                       ? "bg-yellow-200 text-yellow-800"
//                       : order.status.toLowerCase() === "shipped"
//                       ? "bg-blue-200 text-blue-800"
//                       : order.status.toLowerCase() === "delivered"
//                       ? "bg-green-200 text-green-800"
//                       : order.status === "CANCELLED"
//                       ? "bg-red-200 text-red-800"
//                       : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   {order.status.toLowerCase()}
//                 </span>
//               </div>

//               <div className="text-sm text-gray-700">
//                 <p><strong>User:</strong> {user?.name || "Unknown"}</p>
//                 <p><strong>Email:</strong> {user?.email || "N/A"}</p>
//                 <p><strong>Payment:</strong> {order.payment_method || order.payment || "N/A"}</p>
//                 <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
//               </div>

//               <div className="mt-4 flex justify-between items-center">
//                 <div>
//                   <label className="text-sm font-semibold mr-2">Status:</label>
//                   <select
//                     value={order.status}
//                     onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                     className="border rounded p-1"
//                   >
//                     <option value="PLACED">Placed</option>
//                     <option value="SHIPPED">Shipped</option>
//                     <option value="DELIVERED">Delivered</option>
//                     <option value="CANCELLED">Cancelled</option>
//                   </select>
//                 </div>

//                 <button
//                   onClick={() => setSelectedOrder(order)}
//                   className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-[90%] max-w-2xl relative shadow-xl overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
//             {(() => {
//               const user = users.find(
//                 (u) => u.id.toString() === selectedOrder.user.toString()
//               );
//               return (
//                 <>
//                   <div className="text-sm text-gray-700 space-y-1 mb-4">
//                     <p><strong>Order ID:</strong> {selectedOrder.id}</p>
//                     <p><strong>User Name:</strong> {user?.name || "Unknown"}</p>
//                     <p><strong>Email:</strong> {user?.email || "N/A"}</p>
//                     <p><strong>Address:</strong> {selectedOrder.address || "N/A"}</p>
//                     <p><strong>Payment Method:</strong> {selectedOrder.payment_method || selectedOrder.payment || "N/A"}</p>
//                     <p><strong>Status:</strong> {selectedOrder.payment_status|| "N/A"}</p>
//                     <p><strong>Status:</strong> {selectedOrder.status}</p>
//                     <p><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
//                   </div>
                  

//                   <div className="border-t pt-3">
//                     <h3 className="font-semibold mb-2">Items:</h3>
//                     {selectedOrder.items && selectedOrder.items.length > 0 ? (
//                       selectedOrder.items.map((item, i) => (
//                         <div key={i} className="flex gap-3 mb-3 items-center border-b pb-2">
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-16 h-16 object-cover rounded"
//                           />
//                           <div>
//                             <p className="font-semibold">{item.product_name}</p>
//                             <p>₹{item.price} × {item.quantity}</p>
//                             {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500">No items found</p>
//                     )}
//                   </div>

//                   {selectedOrder.total_amount && (
//                     <p className="mt-3 font-bold text-lg text-right">Total: ₹{selectedOrder.total_amount}</p>
//                   )}
//                 </>
//               );
//             })()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageOrders;



import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

function ManageOrders() {
  const { orders, users, loading, handleStatusChange } = useContext(AdminContext);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const closeModal = () => setSelectedOrder(null);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  );

  if (!orders || orders.length === 0)
    return <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg m-6 border-2 border-dashed">No orders found.</div>;

  // Status Badge Styles Helper
  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    if (s === "placed") return "bg-amber-100 text-amber-700 border-amber-200";
    if (s === "shipped") return "bg-blue-100 text-blue-700 border-blue-200";
    if (s === "delivered") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (s === "cancelled") return "bg-rose-100 text-rose-700 border-rose-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Order Management</h1>
          <p className="text-slate-500">Monitor and update customer orders</p>
        </header>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Order Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const user = users.find((u) => u.id.toString() === order.user.toString());
                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">#{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{user?.name || "Unknown"}</div>
                      <div className="text-xs text-slate-500">{user?.email || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-bold py-1 px-2 rounded-md border ${getStatusStyles(order.status)} outline-none cursor-pointer`}
                      >
                        <option value="PLACED">Placed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-sky-600 hover:text-sky-800 text-sm font-semibold"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden grid gap-4">
          {orders.map((order) => {
            const user = users.find((u) => u.id.toString() === order.user.toString());
            return (
              <div key={order.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order</span>
                    <h3 className="text-lg font-bold text-slate-900">#{order.id}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4 text-sm border-b border-slate-50 pb-4">
                  <p className="flex justify-between"><span className="text-slate-500">Customer:</span> <span className="font-medium">{user?.name}</span></p>
                  <p className="flex justify-between"><span className="text-slate-500">Method:</span> <span className="font-medium">{order.payment_method || "N/A"}</span></p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="flex-1 text-sm border border-slate-200 rounded-lg p-2 bg-slate-50"
                  >
                    <option value="PLACED">Placed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Backdrop Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-xl font-bold text-slate-900">Order Deep-Dive</h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {(() => {
                const user = users.find((u) => u.id.toString() === selectedOrder.user.toString());
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Customer Info</h4>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <p className="text-sm font-bold text-slate-800">{user?.name || "Unknown"}</p>
                          <p className="text-sm text-slate-500">{user?.email}</p>
                          <p className="text-sm text-slate-500 mt-2 italic">"{selectedOrder.address || "No address provided"}"</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Payment Details</h4>
                        <p className="text-sm"><span className="text-slate-500">Method:</span> {selectedOrder.payment_method || "N/A"}</p>
                        <p className="text-sm"><span className="text-slate-500">Status:</span> <span className="text-emerald-600 font-medium">{selectedOrder.payment_status}</span></p>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {selectedOrder.items?.map((item, i) => (
                          <div key={i} className="flex gap-3 items-center p-2 rounded-lg border border-slate-50 bg-white">
                            <img src={item.image} alt={item.product_name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-800 truncate">{item.product_name}</p>
                              <p className="text-xs text-slate-500">₹{item.price} × {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-end">
                        <span className="text-slate-500 text-sm">Amount Due:</span>
                        <span className="text-2xl font-black text-slate-900">₹{selectedOrder.total_amount}</span>
                      </div>
                    </section>
                  </div>
                );
              })()}
            </div>
            <div className="p-4 bg-slate-50 text-right border-t border-slate-100">
               <button onClick={closeModal} className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
                 Done
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOrders;

