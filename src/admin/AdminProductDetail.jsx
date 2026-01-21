import React, { useEffect, useState,useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
function AdminProductDetail() {
  const { products, deleteProduct, addProduct,fetchAllData, editProduct } = useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
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
    </div>
  );
}

export default AdminProductDetail;
