
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000";

  const fetchAllData = async () => {
    setLoading(true);
    try{
      await fetchUsers();
      await fetchProducts();
      await fetchOrders();
    }catch(err){
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
   
  };
  const fetchUsers=async ()=>{
    const res=await api.get('admin/users');
    setUsers(res.data);
  }

  const fetchProducts=async ()=>{
    const res=await api.get('admin/products');
    setProducts(res.data);
  }
  const fetchOrders=async ()=>{
    const res=await api.get('admin/orders');
    setOrders(res.data);
  }
  useEffect(() => {
    fetchAllData();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await api.post('admin/products/', product);
      toast.success("Product added successfully");
      setProducts((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
   const handleStatusChange = async (id, newStatus) => {
      
         try {
      await api.patch(`admin/orders/${id}/status/`, {
        status: newStatus,
      });
      toast.success("Order status updated");
      fetchOrders(); // refresh list
    } catch (err) {
      toast.error("Failed to update status");
    }
    };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`admin/products/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.warn('Product deleted');
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const editProduct = async (id, updatedData) => {
    try {
      const res = await api.put(`admin/products/${id}/`, updatedData);
      setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      toast.success('Product updated');
    } catch (err) {
      console.error("Error editing product:", err);
    }
  };


  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };
  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`${BASE_URL}/contacts/${contactId}`);
      setContacts((prev) => prev.filter((c) => c.id !== contactId));
      console.log("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        users,
        products,
        orders,
        contacts,
        loading,
        fetchAllData,
        handleStatusChange,
        addProduct,
        editProduct,
        deleteProduct,
        deleteUser,
        deleteContact,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
