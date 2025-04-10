


function ListOfPerfumes ({perfumes }) {
  return (
    <ul className="perfumes ">
    { perfumes.map(perfumes => (
      <li className="perfume" key={ perfumes.id }>
        <h3>{perfumes.titulo}</h3>
        <p>{perfumes.descripcion}</p>
        <img src={ perfumes.imagen } alt={ perfumes.titulo } />	
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

export function Perfumes ({ perfumes}) {
  const hasPerfumes = perfumes?.length > 0 
  return (
    hasPerfumes ? <ListOfPerfumes perfumes={ perfumes } /> : <NoPerfumesResults />
  )
}