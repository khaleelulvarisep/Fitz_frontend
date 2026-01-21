import React, { useEffect, useState,useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

import { AdminContext } from "../context/AdminContext";
function AdminProductDetail() {
  const { products, deleteProduct, addProduct,fetchAllData, editProduct } = useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`admin/products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to load product");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;
       deleteProduct(id);
       fetchAllData()
       navigate("/admin/products");

  };
  const handleEditSave = () => {
      if (!editingProduct.name || !editingProduct.price) {
        toast.info("Please fill all fields");
        return;
      }
      editProduct(editingProduct.id, editingProduct);
      setProduct(editingProduct);
      setEditingProduct(null);
    };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Image */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-xl shadow"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <p className="text-2xl font-semibold text-sky-700 mb-4">
          ₹{product.price}
        </p>

        <p className="mb-2">
          <strong>Category:</strong> {product.category}
        </p>

        <p className="mb-4 text-sm text-gray-500">
          Created at: {new Date(product.created_at).toLocaleString()}
        </p>

        <div className="flex gap-4 mt-6">
          <button
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg transition "
            onClick={() => {setEditingProduct(product)}}
          >
           Edit Product
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg  transition"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        </div>
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
  );
}

export default AdminProductDetail;
