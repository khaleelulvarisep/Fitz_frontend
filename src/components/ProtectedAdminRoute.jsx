
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  
  if (!user || !user.isAdmin) {
    alert("Access denied. Admins only.");
    return <Navigate to="/" replace />; 
  }

 
  return children;
}

export default ProtectedAdminRoute;
