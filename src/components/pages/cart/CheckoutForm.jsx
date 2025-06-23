import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import {
  successNotification,
  errorNotification,
} from "../../utils/notifications/Notifications";
import { customFetch } from "../../utils/fetch/customFetch";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cart, total, onConfirm, onCancel }) => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!userData?.id) {
      errorNotification("Debes estar logueado para realizar una compra.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      user_id: userData.id,
      address: userData.address,
      total,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.cantidad,
        unitPrice: item.precio,
      })),
    };

    try {
      const response = await customFetch("/api/order", "POST", orderData);
      successNotification("Orden creada exitosamente");
      onConfirm(response); // muestra el resumen desde CartPage
    } catch (error) {
      console.error("Error al enviar la orden:", error);
      errorNotification("Ocurrió un error al procesar la compra.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-form">
      <h3>Confirmar Compra</h3>
      <p>
        <strong>Nombre:</strong> {userData?.name}
      </p>
      <p>
        <strong>Email:</strong> {userData?.email}
      </p>
      <p>
        <strong>Dirección:</strong> {userData?.address}
      </p>
      <p>
        <strong>Total:</strong> ${total.toFixed(2)}
      </p>

      <div className="checkout-actions">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Finalizar compra"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;
