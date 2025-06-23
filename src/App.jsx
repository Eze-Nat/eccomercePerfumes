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
import ProtectedLogin from "./components/routes/protected/ProtectedLogin.jsx";

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
        <Route path="*" element={<NotFound />} />
        

        {/* Protected Routes */}
        <Route element={<ProtectedLogin />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserListContainer />} />
        </Route>

      </Routes>
    </div>
    </div>
    
  );
}

export default App;
