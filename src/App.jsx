import './App.css'
import { Perfumes } from './components/perfumes'
import productList from "./products/productList.json"
/* import noResults from "./products/noResults.json" */

function App() {
  const perfumes = productList.Search

  return (

      <div className='page'>
        <header>
          <h1>Perfumes</h1>
          <form className='form'>
            <input placeholder='Perfumes Arabes' />
            <button type="submit">Buscar</button>
          </form>
        </header>
        <main>
          <Perfumes perfumes={perfumes}/>
        </main>
      </div>
    
  )
}

export default App
