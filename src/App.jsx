
import { Perfumes } from "./components/perfumes";
import productList from "./products/productList.json";
/* import noResults from "./products/noResults.json" */
import Navbar from "./components/Navbar";

function App() {
  const perfumes = productList.Search;

  return (
    <div className="page">
      <header>
        <Navbar />
      </header>
      <main>
        <Perfumes perfumes={perfumes} />
      </main>
    </div>
  );
}

export default App;
