import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/admin/DashboardAdmin.jsx";
import CartPage from "./components/pages/cart/CartPage.jsx";
import Navbar from "./components/pages/navbar/Navbar";
import NotFound from "./components/routes/notFound/NotFound.jsx";
import UserListContainer from "./components/admin/users/UserListContainer.jsx"
import ProtectedLogin from "./components/routes/protectedLogin/ProtectedLogin.jsx";

import "./App.css";

function App() {
  return (
    <div className="gepa">
      <ToastContainer />
      <Navbar />
      <div className="routes">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated Routes */}
          <Route element={<ProtectedLogin />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserListContainer />} />          
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
