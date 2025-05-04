import { useState } from "react";

import { Perfumes } from "../perfumes.jsx";
import productList from "../../products/productList.json";
/* import noResults from "./products/noResults.json" */
import Navbar from "./navbar/Navbar.jsx";

const Home = () => {
  const perfumes = productList.Search;
  const [searchPerfume,SetsearchPerfume]=useState('');

  const handleSearchPerfume = (value) =>{
    SetsearchPerfume(value)
  }

  return <>
    <Navbar onSearchPerfume={handleSearchPerfume}/>
    <Perfumes perfumes={perfumes} searchPerfume={searchPerfume} />
  </>
};

export default Home;
