import { Perfumes } from "./components/perfumes";
import productList from "./products/productList.json";
/* import noResults from "./products/noResults.json" */
import Navbar from "./components/navbar/Navbar";

function App() {
  const perfumes = productList.Search;

  return (
    <div className="gepa">
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
