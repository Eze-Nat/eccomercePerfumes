import { useState } from "react";
import { useCart } from "../../../contexts/cart/CartContextProvider";
import { Button } from "react-bootstrap";
import {
  successNotification,
  errorNotification,
} from "../../utils/notifications/Notifications";
// import customFetch from "../../utils/fetch/customfetch";
import CheckoutForm from "./CheckoutForm";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart, decreaseQuantity } =
    useCart();
  const [showForm, setShowForm] = useState(false);
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

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
    <div className="cart-page">
      <h2>Resumen del Carrito</h2>

      {showForm ? (
        <CheckoutForm
          total={total}
          cart={cart}
          onConfirm={handleConfirmCheckout}
          onCancel={() => setShowForm(false)}
        />
      ) : cart.length === 0 ? (
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

                <div className="quantity-controls">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </Button>
                  <span className="quantity">{item.cantidad}</span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </Button>
                </div>

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

          <div className="cart-summary">
            <h4 className="total">
              Total: <strong>${total.toFixed(2)}</strong>
            </h4>
          </div>

          <div className="cart-actions">
            <Button
              variant="outline-secondary"
              className="clear-cart-btn"
              onClick={handleClearCart}
            >
              Vaciar carrito
            </Button>

            <Button
              variant="success"
              className="checkout-btn"
              onClick={() => setShowForm(true)}
            >
              Proceder al pago
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
