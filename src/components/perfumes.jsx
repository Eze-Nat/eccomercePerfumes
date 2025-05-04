
function ListOfPerfumes ({perfumes,searchPerfume}) {
  
  const perfumesFiltered = perfumes.filter(perfume => perfume.titulo?.toUpperCase().includes(searchPerfume.toUpperCase()))
  console.log(perfumesFiltered);
  if (!perfumesFiltered.length) {
    return <NoPerfumesResults />;
  }
  return (
    <ul className="perfumes ">
    
    { perfumesFiltered.map(perfume => (
      <li className="perfume" key={ perfume.id }>
        <h3>{perfume.titulo}</h3>
        <p>{perfume.descripcion}</p>
        <img src={ perfume.imagen } alt={ perfume.titulo } />	
      </li>
    ))
    }
  </ul>
  )
}

function NoPerfumesResults ()  {
  return (
    <p>No se encontraron perfumes</p>
  )
}

export function Perfumes({ perfumes, searchPerfume = "" }) {
  if (!perfumes || perfumes.length === 0) {
    return <NoPerfumesResults />;
  }

  return <ListOfPerfumes perfumes={perfumes} searchPerfume={searchPerfume} />;
}