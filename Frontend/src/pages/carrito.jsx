import { useState } from "react";
import useCarritoStore from "../store/carritoStore";
import ModalPago from "../components/ModalPago";

export default function Carrito() {
  const { carrito, quitarProducto, vaciarCarrito } = useCarritoStore();
  const [modalOpen, setModalOpen] = useState(false);

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  const handlePagar = (metodo, pago, vuelto) => {
    setModalOpen(false);
    vaciarCarrito();
    if (metodo === "efectivo") {
      alert(`¡Gracias por tu compra!\nPagaste $${pago}, tu vuelto es $${vuelto}`);
    } else {
      alert("¡Gracias por tu compra con tarjeta!");
    }
  };

  return (
    <div className="carrito-page">
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.map((prod) => (
              <li key={prod.id}>
                {prod.Nombre} x{prod.cantidad} - ${prod.precio * prod.cantidad}
                <button onClick={() => quitarProducto(prod.id)}>Quitar</button>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
          <button
            style={{ marginLeft: "1rem" }}
            onClick={() => setModalOpen(true)}
          >
            Pagar
          </button>
          <ModalPago
            open={modalOpen}
            total={total}
            onClose={() => setModalOpen(false)}
            onPagar={handlePagar}
          />
        </>
      )}
    </div>
  );
}
