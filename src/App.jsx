import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/pages/dashboard/Dashboard.jsx";
import CartPage from "./components/pages/cart/CartPage.jsx";
import Navbar from "./components/pages/navbar/Navbar"; // Importamos Navbar
import { ToastContainer } from "react-toastify"
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
      </Routes>
    </div>
  );
}

export default App;
