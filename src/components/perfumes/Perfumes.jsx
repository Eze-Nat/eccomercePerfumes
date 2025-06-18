import { Container, Row, Col } from 'react-bootstrap';
import PerfumeCard from './PerfumeCard.jsx';

import { useState } from 'react';

const NoPerfumesResults = () => (
  <div className="text-center my-5">
    <p>No se encontraron perfumes</p>
  </div>
);
const ListOfPerfumes = ({ perfumes, searchPerfume, onUpdatePerfume }) => {
  const perfumesFiltered = perfumes.filter(perfume => 
    perfume.titulo?.toUpperCase().includes(searchPerfume.toUpperCase())
  );

  if (!perfumesFiltered.length) return <NoPerfumesResults />;

  return (
    <Container className="my-5">
      <Row className="g-4">
        {perfumesFiltered.map(perfume => (
          <Col className="perfume" key={perfume.id}>
            <PerfumeCard perfume={perfume} isAdmin={true} onUpdate={onUpdatePerfume}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export const Perfumes = ({ perfumes: initialPerfumes, searchPerfume = "" }) => {
  const [perfumes, setPerfumes] = useState(initialPerfumes || []);

  const handleUpdatePerfume = (updatedPerfume) => {
    setPerfumes(prevPerfumes => 
      prevPerfumes.map(perfume => 
        perfume.id === updatedPerfume.id ? updatedPerfume : perfume
      )
    );
    console.log("Updated perfume:", updatedPerfume);
    localStorage.setItem("perfumes", JSON.stringify(perfumes));
  }
  if (!perfumes?.length) return <NoPerfumesResults />;
  return <ListOfPerfumes perfumes={perfumes} searchPerfume={searchPerfume} onUpdatePerfume={handleUpdatePerfume}/>;
};