import { useState } from "react";
import { useCart } from "../../../contexts/cart/CartContextProvider";
import { Button, Row, Col, Badge, Card } from "react-bootstrap";
import {
  successNotification,
  errorNotification,
} from "../../utils/notifications/Notifications";
import CheckoutForm from "./CheckoutForm";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart, decreaseQuantity } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const increaseQuantity = (product) => addToCart(product);

  const handleClearCart = () => {
    if (window.confirm("¿Seguro que quieres vaciar el carrito?")) {
      clearCart();
      successNotification("Carrito vacío!");
    }
  };

  const handleConfirmCheckout = () => {
    setOrderSuccessful(true);
    clearCart();
    setShowForm(false);
  };

  if (orderSuccessful) {
    return (
      <div className="text-center mt-5">
        <h2>¡Gracias por tu compra!</h2>
        <p>Recibirás todos los detalles por email.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Resumen del Carrito</h2>

      {showForm ? (
        <CheckoutForm
          total={total}
          cart={cart}
          onConfirm={handleConfirmCheckout}
          onCancel={() => setShowForm(false)}
        />
      ) : cart.length === 0 ? (
        <p className="text-center py-5">Tu carrito está vacío. ¡Agrega algunos perfumes!</p>
      ) : (
        <>
          <div className="mb-4">
            {cart.map((item) => (
              <Row key={item.id} className="align-items-center mb-3 p-3 border rounded">
                <Col xs={3} md={2}>
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="img-fluid rounded"
                    style={{ maxHeight: "80px" }}
                  />
                </Col>
                <Col xs={9} md={4}>
                  <h5 className="mb-1">{item.nombre}</h5>
                  <p className="mb-1 text-white">{item.descripcion}</p>
                  <p className="mb-0">${item.precio.toFixed(2)}</p>
                </Col>
                <Col xs={12} md={3} className="mt-2 mt-md-0">
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                      className="me-2"
                    >
                      -
                    </Button>
                    <Badge bg="light" text="dark" className="mx-2">
                      {item.cantidad}
                    </Badge>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => increaseQuantity(item)}
                      className="me-2"
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col xs={12} md={3} className="mt-2 mt-md-0 text-md-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>
            ))}
          </div>

          <Row className="mt-4">
            <Col md={{ span: 6, offset: 6 }}>
              <div className="p-3 rounded">
                <h4 className="text-end">
                  Total: <strong>${total.toFixed(2)}</strong>
                </h4>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button
                    variant="outline-secondary"
                    onClick={handleClearCart}
                  >
                    Vaciar carrito
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => setShowForm(true)}
                  >
                    Proceder al pago
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default CartPage;