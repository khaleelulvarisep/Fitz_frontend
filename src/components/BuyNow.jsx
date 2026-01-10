import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
function BuyNow({ product }) {
  const {user}=useContext(UserContext)
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if(!user){
       alert('Please Login TO Buy');
       return navigate('/login')
    }
    localStorage.setItem("buyNowProduct", JSON.stringify(product));
    navigate("/checkout"); 
  };

  return (
    <button
      onClick={handleBuyNow}
      className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
    >
      Buy Now
    </button>
  );
}

export default BuyNow;
