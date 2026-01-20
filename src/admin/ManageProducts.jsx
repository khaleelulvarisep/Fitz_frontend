


import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function ManageProducts() {
  const { products, deleteProduct, addProduct, editProduct } = useContext(AdminContext);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image) {
      toast.info("Please fill all fields");
      return;
    }
    addProduct(newProduct);
    toast.success('New product added')
    setNewProduct({ name: "", price: "", category: "", image: "" });
  };

  const handleEditSave = () => {
    if (!editingProduct.name || !editingProduct.price) {
      toast.info("Please fill all fields");
      return;
    }
    editProduct(editingProduct.id, editingProduct);
    toast.success('Product updated')
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-md shadow-md rounded-2xl p-6 flex justify-between items-center border border-sky-100">
          <h2 className="text-3xl font-bold text-sky-800 flex items-center gap-3">
            🛍️ Manage Products
          </h2>
          <span className="text-gray-600 text-sm bg-sky-100 px-4 py-1 rounded-full shadow-sm">
            Total Products:<b>{products?.length || 0}</b>

          </span>
        </div>

        {/* Add Product Section */}
        <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-sky-100">
          <h3 className="text-lg font-semibold text-sky-700 mb-4 flex items-center gap-2">
            <FaPlus className="text-sky-600" /> Add New Product
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-sky-400 shadow-sm"
            />
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-md font-medium transition-all"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-sky-100 overflow-hidden">
          <table className="w-full text-left text-gray-700">
            <thead className="bg-gradient-to-r from-sky-100 to-blue-100 uppercase text-sm text-sky-800 font-semibold">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No products available. Add some to get started 🚀
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-sky-50 transition-all duration-200"
                  >
                    <td className="p-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                    </td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3 font-semibold text-sky-700">₹{p.price}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => setEditingProduct(p)}
                          title="Edit Product"
                          className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {deleteProduct(p.id);toast.warn('Product deleted')}}
                          title="Delete Product"
                          className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fadeIn">
              <button
                onClick={() => setEditingProduct(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
              <h3 className="text-xl font-semibold text-sky-700 mb-5 text-center">
                Edit Product
              </h3>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-lg hover:from-sky-600 hover:to-blue-700 transition"
                >
                  Save
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