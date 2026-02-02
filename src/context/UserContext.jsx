

import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);

  const[user,setUser]=useState(null)
  const[userLoading,setUserLoading]=useState(true);
  const [loadingCart, setLoadingCart] = useState(true);
  const token=localStorage.getItem('access');
  /* ================= INIT AUTH ================= */

    // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      initAuth();
    } else {
      setLoadingCart(false);
    }
  }, []);

  const initAuth = async () => {
    try {
      await fetchUser();
      await fetchCart();
      await fetchWishlist();
    } catch (err) {
      console.error("Auth init failed", err);
      logout();
    }
  };

  const fetchUser = async () => {
    const res = await api.get("auth/me/");
    setUserLoading(false);
    setUser(res.data);
  };

  const fetchCart = async () => {
    try {
      const res = await api.get("cart/");
      setCart(res.data);
    } finally {
      setLoadingCart(false);
    }
  };
  const fetchWishlist = async () => {
  const res = await api.get("wishlist/");
  setWishlist(res.data);
};


  const logout = () => {
    setUser(null);
    setCart(null);
    setWishlist(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  /* ================= WISHLIST ================= */

  const addToWishlist = async (productId) => {
  const res = await api.post("wishlist/", {
    product_id: productId,
  });
  setWishlist(res.data);
};


const removeFromWishlist = async (productId) => {
  const res = await api.delete(`wishlist/item/${productId}/`);
  setWishlist(res.data);
};

  /* ================= CART ================= */

 


  const addToCart = async (productId) => {
    const res = await api.post("cart/", { product_id: productId });
    setCart(res.data);
  };

  const updateCartItem = async (productId, quantity) => {
    const res = await api.patch(`cart/item/${productId}/`, {
      quantity,
    });
    setCart(res.data);
  };

  const removeFromCart = async (productId) => {
    const res = await api.delete(`cart/item/${productId}/`);
    setCart(res.data);
  };

  return (
    <UserContext.Provider
      value={{
        logout,
        user,
        userLoading,
        token,
        setUser,
        cart,
        loadingCart,
        // fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        wishlist,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
