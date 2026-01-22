


// import React, { useContext, useState } from "react";
// import { AdminContext } from "../context/AdminContext";
// import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// function ManageProducts() {
//   const { products, deleteProduct, addProduct, editProduct } = useContext(AdminContext);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     category: "",
//     image: "",
//     description:"",
//   });
//   const navigate = useNavigate();
//   const [editingProduct, setEditingProduct] = useState(null);

//   const handleAdd = () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image|| !newProduct.description) {
//       toast.info("Please fill all fields");
//       return;
//     }
//     addProduct(newProduct);
//     setNewProduct({ name: "", price: "", category: "", image: "" ,description:""});
//   };

//   const handleEditSave = () => {
//     if (!editingProduct.name || !editingProduct.price) {
//       toast.info("Please fill all fields");
//       return;
//     }
//     editProduct(editingProduct.id, editingProduct);
    
//     setEditingProduct(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6 md:p-10">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="bg-white/60 backdrop-blur-md shadow-md rounded-2xl p-6 flex justify-between items-center border border-sky-100">
//           <h2 className="text-3xl font-bold text-sky-800 flex items-center gap-3">
//             🛍️ Manage Products
//           </h2>
//           <span className="text-gray-600 text-sm bg-sky-100 px-4 py-1 rounded-full shadow-sm">
//             Total Products:<b>{products?.length || 0}</b>

//           </span>
//         </div>

//         {/* Add Product Section */}
//         <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-sky-100">
//           <h3 className="text-lg font-semibold text-sky-700 mb-4 flex items-center gap-2">
//             <FaPlus className="text-sky-600" /> Add New Product
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <input
//               type="text"
//               placeholder="Name"
//               value={newProduct.name}
//               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newProduct.price}
//               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
//             />
//             <input
//               type="text"
//               placeholder="Category"
//               value={newProduct.category}
//               onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={newProduct.image}
//               onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
//             />
//              <input
//               type="text"
//               placeholder="Description"
//               value={newProduct.description}
//               onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
//             />
//           </div>

//           <div className="mt-5 flex justify-end">
//             <button
//               onClick={handleAdd}
//               className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-md font-medium transition-all"
//             >
//               Add Product
//             </button>
//           </div>
//         </div>

//         {/* Products Table */}
//         <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-sky-100 overflow-hidden">
//           <table className="w-full text-left text-gray-700">
//             <thead className="bg-gradient-to-r from-sky-100 to-blue-100 uppercase text-sm text-sky-800 font-semibold">
//               <tr>
//                 <th className="p-3">Image</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Category</th>
//                 <th className="p-3">Price</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-8 text-gray-500">
//                     No products available. Add some to get started 🚀
//                   </td>
//                 </tr>
//               ) : (
//                 products.map((p) => (
//                   <tr
//                     key={p.id}
//                     className="border-b hover:bg-sky-50 transition-all duration-200"
//                       onClick={() => navigate(`/admin/products/${p.id}`)}
//                   >
//                     <td className="p-3" >
//                       <img
//                         src={p.image}
//                         alt={p.name}
//                         className="w-16 h-16 rounded-lg object-cover border"
//                       />
//                     </td>
//                     <td className="p-3 font-medium">{p.name}</td>
//                     <td className="p-3">{p.category}</td>
//                     <td className="p-3 font-semibold text-sky-700">₹{p.price}</td>
//                     <td className="p-3 text-center">
//                       <div className="flex items-center justify-center gap-4">
//                         <button
//                           onClick={(e) => {e.stopPropagation();setEditingProduct(p);}}
//                           title="Edit Product"
//                           className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={(e) => {e.stopPropagation();deleteProduct(p.id);}}
//                           title="Delete Product"
//                           className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Edit Modal */}
//         {editingProduct && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fadeIn">
//               <button
//                 onClick={() => setEditingProduct(null)}
//                 className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//               >
//                 <FaTimes />
//               </button>
//               <h3 className="text-xl font-semibold text-sky-700 mb-5 text-center">
//                 Edit Product
//               </h3>

//               <div className="space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={editingProduct.name}
//                   onChange={(e) =>
//                     setEditingProduct({ ...editingProduct, name: e.target.value })
//                   }
//                   className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Price"
//                   value={editingProduct.price}
//                   onChange={(e) =>
//                     setEditingProduct({ ...editingProduct, price: e.target.value })
//                   }
//                   className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Category"
//                   value={editingProduct.category}
//                   onChange={(e) =>
//                     setEditingProduct({ ...editingProduct, category: e.target.value })
//                   }
//                   className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Image URL"
//                   value={editingProduct.image}
//                   onChange={(e) =>
//                     setEditingProduct({ ...editingProduct, image: e.target.value })
//                   }
//                   className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 mt-5">
//                 <button
//                   onClick={() => setEditingProduct(null)}
//                   className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleEditSave}
//                   className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-lg hover:from-sky-600 hover:to-blue-700 transition"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ManageProducts;


import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaBox, FaImage, FaTag, FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const { products, deleteProduct, addProduct, editProduct } = useContext(AdminContext);
  const navigate = useNavigate();

  // State for visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image || !newProduct.description) {
      toast.info("Please fill all fields");
      return;
    }
    addProduct(newProduct);
    setNewProduct({ name: "", price: "", category: "", image: "", description: "" });
    setIsAddModalOpen(false);
  };

  const handleEditSave = () => {
    if (!editingProduct.name || !editingProduct.price) {
      toast.info("Please fill all fields");
      return;
    }
    editProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <FaBox className="text-sky-600" /> Inventory Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage your catalog, prices, and stock details.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">In Stock</p>
              <p className="text-xl font-black text-slate-900">{products?.length || 0} Items</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-sky-200 transition-all"
            >
              <FaPlus /> Add Product
            </button>
          </div>
        </header>

        {/* Product List Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4 text-center">Preview</th>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-20">
                      <div className="text-slate-300 mb-2 font-medium italic">No products found in the database</div>
                      <button onClick={() => setIsAddModalOpen(true)} className="text-sky-600 font-bold hover:underline">Click here to add your first item</button>
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/admin/products/${p.id}`)}
                    >
                      <td className="px-6 py-4 flex justify-center">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-sm group-hover:scale-110 transition-transform"
                        />
                      </td>
                      <td className="px-6 py-4 min-w-[200px]">
                        <p className="font-bold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">{p.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[150px]">{p.description || "No description provided."}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black uppercase tracking-tighter bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900">₹{p.price}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditingProduct(p); }}
                            className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteProduct(p.id); }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- MODALS --- */}

        {/* Add Product Modal */}
        {(isAddModalOpen || editingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}></div>
            
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingProduct ? "Update Product" : "New Product Details"}
                </h2>
                <button onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="text-slate-400 hover:text-slate-600">
                  <FaTimes />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Form Fields */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5"><FaTag size={10}/> Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Premium Leather Jacket"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, name: e.target.value}) : setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5"><FaRupeeSign size={10}/> Price</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={editingProduct ? editingProduct.price : newProduct.price}
                      onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, price: e.target.value}) : setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5"><FaBox size={10}/> Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Menswear"
                      value={editingProduct ? editingProduct.category : newProduct.category}
                      onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, category: e.target.value}) : setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5"><FaImage size={10}/> Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.com/product.jpg"
                    value={editingProduct ? editingProduct.image : newProduct.image}
                    onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, image: e.target.value}) : setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Short product overview..."
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, description: e.target.value}) : setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
                  className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={editingProduct ? handleEditSave : handleAdd}
                  className="bg-sky-600 text-white px-8 py-2 rounded-xl text-sm font-bold shadow-lg shadow-sky-200 hover:bg-sky-700 transition-all"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;