import React from "react";
import { useCart } from "../../../contexts/CartContextProvider";
import { Button } from "react-bootstrap";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-page">
      <h2>Resumen del Carrito</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío. ¡Agrega algunos perfumes!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imagen} alt={item.nombre} className="cart-image" />
              <div className="cart-details">
                <h4>{item.nombre}</h4>
                <p>{item.descripcion}</p>
                <p>
                  <strong>${item.precio.toFixed(2)}</strong>
                </p>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}

          <Button
            variant="outline-secondary"
            className="clear-cart-btn"
            onClick={clearCart}
          >
            Vaciar carrito
          </Button>

          <Button
            variant="success"
            className="checkout-btn"
            onClick={() => alert("Función de checkout pendiente 🚀")}
          >
            Proceder al pago
          </Button>
        </>
      )}
    </div>
  );
};

export default CartPage;
