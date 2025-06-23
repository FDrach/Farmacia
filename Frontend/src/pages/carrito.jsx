import { useState } from "react";
import useCarritoStore from "../store/carritoStore";
import useAuthStore from "../store/authStore";
import ModalPago from "../components/ModalPago";
import Notificacion from "../components/Notificacion";

export default function Carrito() {
  const { carrito, quitarProducto, vaciarCarrito } = useCarritoStore();
  const { usuario } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [noti, setNoti] = useState({ visible: false, mensaje: "" });

  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  const mostrarNoti = (mensaje) => {
    setNoti({ visible: true, mensaje });
    setTimeout(() => {
      setNoti({ visible: false, mensaje: "" });
    }, 2000);
  };

  const handlePagar = (metodo, pago, vuelto) => {
    vaciarCarrito();
    mostrarNoti("¡Venta registrada con éxito!");
  };

  const handleOpenModal = () => {
    if (!usuario) {
      alert("Por favor, inicie sesión para realizar el pago.");
      return;
    }
    setModalOpen(true);
  };

  return (
  <>
    <div className="carrito-page">
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.map((prod) => (
              <li key={prod.id}>
                {prod.Nombre} x{prod.cantidad} - $
                {(prod.precio * prod.cantidad).toFixed(2)}
                <button onClick={() => quitarProducto(prod.id)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
          <button style={{ marginLeft: "1rem" }} onClick={handleOpenModal}>
            Pagar
          </button>
          {modalOpen && (
            <ModalPago
              open={modalOpen}
              total={total}
              onClose={() => setModalOpen(false)}
              onPagar={handlePagar}
              carrito={carrito}
              id_cliente={null}
            />
          )}
        </>
      )}
    </div>
    <Notificacion visible={noti.visible} mensaje={noti.mensaje} />
  </>
  );
}
