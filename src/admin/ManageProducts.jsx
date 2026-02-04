
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
                        {/* <span className="text-[10px] font-black uppercase tracking-tighter bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {p.category}
                        </span> */}
                        <span
                         className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded 
                           ${
                             p.category === "men"
                             ? "bg-blue-100 text-blue-700"
                             : p.category === "women"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-slate-100 text-slate-600"
                            }`}>
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