import { Row, Col } from "react-bootstrap";
import PerfumeCard from "./PerfumeCard.jsx";
import useAuth from "../../hooks/useAuth.jsx";

const NoPerfumesResults = () => (
  <div className="text-center my-5">
    <p className="text-white">No se encontraron perfumes</p>
  </div>
);

const ListOfPerfumes = ({ perfumes, searchPerfume, onUpdatePerfume }) => {
  const { hasRole } = useAuth();

  const perfumesFiltered = perfumes
    .filter(perfume => 
      perfume.titulo?.toUpperCase().includes(searchPerfume?.toUpperCase() || "") ||
      perfume.brand?.toUpperCase().includes(searchPerfume?.toUpperCase() || "")
    )
    .filter(perfume => 
      hasRole(["admin", "superadmin"]) ? true : perfume.active
    );

  if (!perfumesFiltered.length) return <NoPerfumesResults />;

  return (
    <div className="perfumes-container"> {/* Contenedor original */}
      <Row className="g-4"> {/* Solo agregamos g-4 para espacio uniforme */}
        {perfumesFiltered.map((perfume) => (
          <Col 
            key={perfume.id}
            className="perfume-col" // Clase original
            xs={12} sm={6} md={4} lg={3} // Responsive sin afectar estilo
          >
            <PerfumeCard
              initialPerfume={perfume}
              isAdmin={hasRole(["admin", "superadmin"])}
              onUpdateProduct={onUpdatePerfume}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export const Perfumes = ({ perfumes, searchPerfume = "", onUpdatePerfume }) => {
  return <ListOfPerfumes 
           perfumes={perfumes} 
           searchPerfume={searchPerfume} 
           onUpdatePerfume={onUpdatePerfume} 
         />;
};