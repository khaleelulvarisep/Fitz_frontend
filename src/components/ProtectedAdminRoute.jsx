
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedAdminRoute({ children }) {
  const {user,userLoading} = useContext(UserContext);
  if(userLoading){
    return <p className="text-center mt-10">Loading...</p>;
  }
  if (!user || !user.is_staff) {
    alert("Access denied. Admins only.");
    return <Navigate to="/" replace />; 
  }

 
  return children;
}

export default ProtectedAdminRoute;
