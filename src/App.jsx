import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";
import Dashboard from "./components/pages/dashboard/Dashboard.jsx";


function App() {
  

  return (
    <div className="gepa">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      {/* <main>
        <Navbar />
        <Perfumes perfumes={perfumes} />
      </main> */}
    </div>
  );
}

export default App;
