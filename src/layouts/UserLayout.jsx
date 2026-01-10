
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
