
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";

import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default UserLayout;
