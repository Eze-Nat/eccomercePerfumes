import { Perfumes } from "./components/perfumes";
import { Routes, Route } from "react-router-dom";

import productList from "./products/productList.json";
/* import noResults from "./products/noResults.json" */
import Navbar from "./components/navbar/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  const perfumes = productList.Search;

  return (
    <div className="gepa">
      <Routes>
        <Route path="/" element={<Perfumes perfumes={perfumes} />} />
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
