import { Container, Row, Col } from "react-bootstrap";
import PerfumeCard from "./PerfumeCard.jsx";
import useAuth from "../../hooks/useAuth.jsx";

const NoPerfumesResults = () => (
  <div className="text-center my-5">
    <p>No se encontraron perfumes</p>
  </div>
);

const ListOfPerfumes = ({ perfumes, searchPerfume, onUpdatePerfume }) => {
  
  const { hasRole} = useAuth();




  let perfumesFiltered = perfumes.filter((perfume) => 
    perfume.titulo?.toUpperCase().includes(searchPerfume?.toUpperCase() || "") ||
    perfume.brand?.toUpperCase().includes(searchPerfume?.toUpperCase() || "")
  );

    perfumesFiltered = perfumesFiltered.filter(perfume =>
    hasRole(["admin", "superadmin"]) ? true : perfume.active
  );

  if (!perfumesFiltered.length) return <NoPerfumesResults />;

  return (
    <Container className="my-5">
      <Row className="g-4">
        {perfumesFiltered.map((perfume) => (
          <Col className="perfume" key={perfume.id}>
            <PerfumeCard
              initialPerfume={perfume}
              isAdmin={hasRole(["admin", "superadmin"])}
              onUpdateProduct={onUpdatePerfume}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export const Perfumes = ({ perfumes, searchPerfume = "", onUpdatePerfume }) => {
  
  return <ListOfPerfumes perfumes={perfumes} searchPerfume={searchPerfume} onUpdatePerfume={onUpdatePerfume} />;
};
