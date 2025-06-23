import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

const NotFound = () => {
    const navigate = useNavigate();

    const goBackHome = () => {
        navigate("/", { replace: true }); 
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
            <Card>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        <h1>404</h1>
                    </Card.Title>
                    <Card.Text>
                        ¡Ups! La página solicitada no fue encontrada
                    </Card.Text>
                    <div className="text-center">
                        <Button onClick={goBackHome}>
                            Volver al inicio
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NotFound;