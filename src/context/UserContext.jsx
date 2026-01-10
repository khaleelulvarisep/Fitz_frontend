
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const BASE_URL = "http://localhost:5000";
  const [user, setUser] = useState(null);

  // Normalize stored user and ensure arrays exist
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      axios
        .get(`${BASE_URL}/users/${parsed.id}`)
        .then((res) => {
          const u = res.data || parsed;
          const normalized = {
            ...u,
            cart: Array.isArray(u.cart) ? u.cart : [],
            wishlist: Array.isArray(u.wishlist) ? u.wishlist : [],
          };
          setUser(normalized);
          localStorage.setItem("user", JSON.stringify(normalized));
        })
        .catch((err) => {
          console.warn("Could not fetch user from server; using local copy", err);
          setUser({
            ...parsed,
            cart: Array.isArray(parsed.cart) ? parsed.cart : [],
            wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
          });
        });
    } catch (e) {
      console.error("Invalid user in localStorage:", e);
      localStorage.removeItem("user");
    }
  }, []);

  const updateLocal = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const updateUser = async (updatedData) => {
    if (!user) return { success: false, message: "No user" };
    const updatedUser = { ...user, ...updatedData };
    updateLocal(updatedUser);
    try {
      await axios.patch(`${BASE_URL}/users/${user.id}`, updatedData);
      return { success: true, user: updatedUser };
    } catch (err) {
      console.error("Error updating user on server:", err);
      return { success: false, error: err };
    }
  };

  // Helper to normalize product id across shapes
  const getProductId = (product) =>
    product?.productId ?? product?.id ?? product?._id ?? null;

  /* ===== CART & WISHLIST OPERATIONS ===== */

  const updateCart = async (newCart) => {
    return updateUser({ cart: newCart });
  };

  const addToCart = async (product) => {
    if (!user) return { success: false, message: "Please login to add to cart." };
    const pid = getProductId(product);
    let cart = Array.isArray(user.cart) ? [...user.cart] : [];
    const exists = cart.find(
      (it) => String(it.productId ?? it.id) === String(pid)
    );

    if (exists) {
      cart = cart.map((it) =>
        String(it.productId ?? it.id) === String(pid)
          ? { ...it, quantity: (it.quantity || 1) + 1 }
          : it
      );
    } else {
      cart.push({ ...product, productId: pid, quantity: 1 });
    }

    const updatedUser = { ...user, cart };
    updateLocal(updatedUser);
    try {
      await axios.patch(`${BASE_URL}/users/${user.id}`, { cart });
      return { success: true, cart };
    } catch (err) {
      console.error("addToCart patch error:", err);
      return { success: false, error: err };
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    const cart = (user.cart || []).filter(
      (it) => String(it.productId ?? it.id) !== String(productId)
    );
    const updatedUser = { ...user, cart };
    updateLocal(updatedUser);
    try {
      await axios.patch(`${BASE_URL}/users/${user.id}`, { cart });
    } catch (err) {
      console.error("removeFromCart patch error:", err);
    }
  };

  const addToWishlist = async (product) => {
    if (!user) return { success: false, message: "Please login to use wishlist." };
    const pid = getProductId(product);
    let wishlist = Array.isArray(user.wishlist) ? [...user.wishlist] : [];
    const exists = wishlist.some(
      (it) => String(it.productId ?? it.id) === String(pid)
    );

    wishlist = exists
      ? wishlist.filter((it) => String(it.productId ?? it.id) !== String(pid))
      : [...wishlist, { ...product, productId: pid }];

    const updatedUser = { ...user, wishlist };
    updateLocal(updatedUser);
    try {
      await axios.patch(`${BASE_URL}/users/${user.id}`, { wishlist });
      return { success: true, wishlist };
    } catch (err) {
      console.error("addToWishlist patch error:", err);
      return { success: false, error: err };
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    const wishlist = (user.wishlist || []).filter(
      (it) => String(it.productId ?? it.id) !== String(productId)
    );
    const updatedUser = { ...user, wishlist };
    updateLocal(updatedUser);
    try {
      await axios.patch(`${BASE_URL}/users/${user.id}`, { wishlist });
    } catch (err) {
      console.error("removeFromWishlist patch error:", err);
    }
  };

  // ===== MOVE FROM WISHLIST -> CART =====
  const moveFromWishlistToCart = async (product) => {
    if (!user) return { success: false, message: "Please login first." };
    const pid = getProductId(product);
    if (!pid) return { success: false, message: "Invalid product object." };

    // Build new cart (increment if exists)
    let cart = Array.isArray(user.cart) ? [...user.cart] : [];
    const existing = cart.find((it) => String(it.productId ?? it.id) === String(pid));
    if (existing) {
      cart = cart.map((it) =>
        String(it.productId ?? it.id) === String(pid)
          ? { ...it, quantity: (it.quantity || 1) + 1 }
          : it
      );
    } else {
      cart.push({ ...product, productId: pid, quantity: 1 });
    }

    // Remove from wishlist
    const wishlist = (user.wishlist || []).filter(
      (it) => String(it.productId ?? it.id) !== String(pid)
    );

    // Optimistic UI update
    const updatedUser = { ...user, cart, wishlist };
    updateLocal(updatedUser);

    try {
      await axios.patch(`${BASE_URL}/users/${user.id}`, { cart, wishlist });
      console.log("Moved item from wishlist to cart:", pid);
      return { success: true, cart, wishlist };
    } catch (err) {
      console.error("moveFromWishlistToCart patch error:", err);
      return { success: false, error: err };
    }
  };

  /* ===== AUTH + ORDER ===== */

  const login = async (email, password) => {
    try {
      const res = await axios.get(`${BASE_URL}/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        const loggedInUser = res.data[0];
        const normalized = {
          ...loggedInUser,
          cart: Array.isArray(loggedInUser.cart) ? loggedInUser.cart : [],
          wishlist: Array.isArray(loggedInUser.wishlist) ? loggedInUser.wishlist : [],
        };
        setUser(normalized);
        localStorage.setItem("user", JSON.stringify(normalized));
        return { success: true, user: normalized };
      }
      return { success: false, message: "Invalid credentials" };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // placeOrder accepts either an items array (for buyNow) or uses user.cart
  const placeOrder = async ({ address, paymentMethod, items: itemsOverride } = {}) => {
    if (!user) return { success: false, message: "Please login to place order" };

    const itemsSource = Array.isArray(itemsOverride) && itemsOverride.length ? itemsOverride : user.cart || [];
    if (itemsSource.length === 0) return { success: false, message: "No items to place order" };

    const normalizedItems = itemsSource.map((it) => ({
      productId: getProductId(it),
      name: it.name,
      price: it.price,
      image: it.image,
      quantity: it.quantity || 1,
      description: it.description || "",
    }));

    const total = normalizedItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);

    const order = {
      userId: user.id,
      items: normalizedItems,
      total,
      address,
      paymentMethod,
      status: "Placed",
      date: new Date().toISOString(),
    };

    try {
      const res = await axios.post(`${BASE_URL}/orders`, order);
      // clear cart only if we placed from cart (not buyNow override)
      if (!Array.isArray(itemsOverride) || itemsOverride.length === 0) {
        const updatedUser = { ...user, cart: [] };
        updateLocal(updatedUser);
        await axios.patch(`${BASE_URL}/users/${user.id}`, { cart: [] });
      }
      return { success: true, order: res.data || order };
    } catch (err) {
      console.error("placeOrder error:", err);
      return { success: false, error: err };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateCart,
        removeFromCart,
        addToCart,
        addToWishlist,
        removeFromWishlist,
        moveFromWishlistToCart, // <-- exported
        login,
        logout,
        placeOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
