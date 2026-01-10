
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

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
    try {
      const [usersRes, productsRes, ordersRes, contactsRes] = await Promise.all([
        axios.get(`${BASE_URL}/users`),
        axios.get(`${BASE_URL}/products`),
        axios.get(`${BASE_URL}/orders`),
        axios.get(`${BASE_URL}/contacts`),
      ]);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setContacts(contactsRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await axios.post(`${BASE_URL}/products`, product);
      setProducts((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const editProduct = async (id, updatedData) => {
    try {
      const res = await axios.patch(`${BASE_URL}/products/${id}`, updatedData);
      setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
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
        addProduct,
        deleteProduct,
        editProduct,
        deleteUser,
        deleteContact,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
