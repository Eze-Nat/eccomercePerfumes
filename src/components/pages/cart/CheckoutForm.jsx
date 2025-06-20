import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../../utils/fetch/customFetch"; // 🔥 Importamos customFetch

const CheckoutForm = ({ cart, onConfirm }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    paymentMethod: "Tarjeta", // 🔄 Valor por defecto
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // 🔄 Redirigir al login si no está autenticado
      return;
    }

    const userData = jwtDecode(token); // 🔥 Decodificar el token
    setFormData({
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      email: userData.email || "",
      address: userData.address || "",
      paymentMethod: "Tarjeta",
    });
  }, []);

  const handlePaymentChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.address
    ) {
      console.error("Faltan datos en el formulario");
      return;
    }

    const orderData = {
      user_id: jwtDecode(localStorage.getItem("token")).id, // 🔥 Obtener ID de usuario desde el token
      total: cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod, // 🔥 Enviar el método de pago elegido
      items: cart.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
    };

    customFetch(
      "/api/order",
      "POST",
      orderData,
      () => {
        console.log("Orden confirmada");
        onConfirm();
      },
      (error) => console.error("Error al confirmar la orden:", error)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Información de envío</h4>

      <input type="text" value={formData.first_name} readOnly />
      <input type="text" value={formData.last_name} readOnly />
      <input type="email" value={formData.email} readOnly />
      <input type="text" value={formData.address} readOnly />

      <h4>Método de pago</h4>
      <select value={formData.paymentMethod} onChange={handlePaymentChange}>
        <option value="Tarjeta">Tarjeta de crédito</option>
        <option value="Efectivo">Efectivo</option>
      </select>

      <button type="submit">Confirmar orden</button>
      <button type="button" onClick={() => navigate("/")}>
        Cancelar
      </button>
    </form>
  );
};

export default CheckoutForm;
