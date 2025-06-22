import { useState } from "react";
import useVentaStore from "../store/ventaStore";
import useAuthStore from "../store/authStore";

export default function ModalPago({ open, total, onClose, onPagar, carrito }) {
  const [metodo, setMetodo] = useState("");
  const [pago, setPago] = useState("");
  const [vuelto, setVuelto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [factura, setFactura] = useState(null);

  const guardarVenta = useVentaStore((state) => state.guardarVenta);
  const { usuario } = useAuthStore();

  const handleMetodo = (m) => {
    setMetodo(m);
    setPago("");
    setVuelto(null);
  };

  const handlePagoChange = (e) => {
    const value = e.target.value.replace(",", ".");
    setPago(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= total) {
      setVuelto((num - total).toFixed(2));
    } else {
      setVuelto(null);
    }
  };

  const handleConfirmarPago = async (metodo_pago) => {
    setLoading(true);
    if (!usuario) {
      alert(
        "Error: No se ha identificado al usuario. Por favor, inicie sesión de nuevo."
      );
      setLoading(false);
      return;
    }

    const medicamentosParaVenta = carrito.map((prod) => ({
      medicamento_id: prod.id,
      cantidad: prod.cantidad,
      precio_unitario_venta: prod.precio,
      descuento_aplicado: 0,
    }));

    const ventaData = {
      id_cliente: null,
      id_usuario: usuario.id,
      total: total,
      metodo_pago: metodo_pago,
      fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
      medicamentos_vendidos: medicamentosParaVenta,
    };

    try {
      const res = await guardarVenta(ventaData);
      setFactura(res);
      onPagar && onPagar(metodo_pago, pago, vuelto);
    } catch (err) {
      alert("Error al registrar la venta");
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="modal-pago-backdrop">
      <div className="modal-pago">
        {factura ? (
          <div className="modal-factura">
            <h2>Factura generada</h2>
            <p>
              <b>ID Venta:</b> {factura.id}
            </p>
            <p>
              <b>Usuario:</b> {factura.id_usuario}
            </p>
            <p>
              <b>Total:</b> ${factura.total}
            </p>
            <p>
              <b>Fecha:</b> {new Date(factura.fecha).toLocaleString()}
            </p>
            <p>
              <b>Método de pago:</b> {factura.metodo_pago}
            </p>
            <button className="modal-pago-confirmar" onClick={onClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            {!metodo && <h2 className="modal-pago-titulo">Método de pago</h2>}
            <button
              className="modal-pago-close"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <span className="modal-pago-x">×</span>
            </button>
            {!metodo && (
              <div className="modal-pago-opciones">
                <button onClick={() => handleMetodo("tarjeta")}>Tarjeta</button>
                <button onClick={() => handleMetodo("efectivo")}>
                  Efectivo
                </button>
              </div>
            )}
            {metodo && (
              <button
                className="modal-pago-volver"
                onClick={() => setMetodo("")}
              >
                🡰
              </button>
            )}
            {metodo === "tarjeta" && (
              <div className="modal-pago-tarjeta">
                <h2>Tarjeta</h2>
                <p>
                  Total a pagar: <b>${total.toFixed(2)}</b>
                </p>
                <button
                  className="modal-pago-confirmar"
                  onClick={() => handleConfirmarPago("tarjeta")}
                >
                  Confirmar pago con tarjeta
                </button>
              </div>
            )}
            {metodo === "efectivo" && (
              <div className="modal-pago-efectivo">
                <h2>Efectivo</h2>
                <p>
                  Total a pagar: <b>${total.toFixed(2)}</b>
                </p>
                <div className="modal-pago-efectivo-row">
                  <label style={{ whiteSpace: "nowrap", fontSize: "1.1rem" }}>
                    ¿Con cuánto paga?
                  </label>
                  <input
                    type="number"
                    min={total}
                    value={pago}
                    onChange={handlePagoChange}
                    placeholder="Ingrese el monto"
                    autoFocus
                  />
                </div>
                <p>
                  Vuelto:{" "}
                  <span className="vuelto">
                    ${vuelto !== null ? vuelto : "0.00"}
                  </span>
                </p>
                <button
                  className="modal-pago-confirmar"
                  disabled={vuelto === null || loading}
                  onClick={() => handleConfirmarPago("efectivo")}
                >
                  {loading ? "Procesando..." : "Confirmar pago en efectivo"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
