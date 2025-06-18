import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/admin/DashboardAdmin.jsx";
import CartPage from "./components/pages/cart/CartPage.jsx";
import Navbar from "./components/pages/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import UserListContainer from "./components/admin/users/UserListContainer.jsx";
import "./App.css";

function App() {
  return (
    <div className="gepa">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/users" element={<UserListContainer />} />
      </Routes>
    </div>
  );
}

export default App;
