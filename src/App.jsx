
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";
import ProductDetails from "./pages/ProductDetails";
import ErrorPage from "./pages/ErrorPage";

import AdminDashboard from "./admin/AdminDashboard";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import ManageContacts from "./admin/ManageContacts";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ManageUsers from "./admin/ManageUsers";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminProductDetail from "./admin/AdminProductDetail";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <UserProvider>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Routes>

       
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path='*' element={<ErrorPage/>}/>
        </Route>

      
        <Route path="/admin" element={

          <AdminProvider>
            <ProtectedAdminRoute>
               <AdminLayout />
            </ProtectedAdminRoute>
          </AdminProvider>
                       }>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="products/:id" element={<AdminProductDetail />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="contacts" element={<ManageContacts />} />
          <Route path="users" element={<ManageUsers/>}/>
        </Route>

      </Routes>
    </UserProvider>
  );
}

export default App;
