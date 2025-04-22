import { Perfumes } from "../perfumes.jsx";

import productList from "../../products/productList.json";
/* import noResults from "./products/noResults.json" */
import Navbar from "./navbar/Navbar.jsx";

const Home = () => {
  const perfumes = productList.Search;
  return <>
    <Navbar> </Navbar>
    <Perfumes perfumes={perfumes} />
  </>
};

export default Home;
