import { Routes, Route } from "react-router-dom";
import { Perfumes } from "./components/perfumes";


import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";


function App() {
  

  return (
    <div className="gepa">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <main>
        <Navbar />
        <Perfumes perfumes={perfumes} />
      </main> */}
    </div>
  );
}

export default App;
