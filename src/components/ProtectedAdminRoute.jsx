
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedAdminRoute({ children }) {
  const {user} = useContext(UserContext);
  if (!user || !user.is_staff) {
    alert("Access denied. Admins only.");
    return <Navigate to="/" replace />; 
  }

 
  return children;
}

export default ProtectedAdminRoute;
