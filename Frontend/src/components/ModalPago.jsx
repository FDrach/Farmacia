import { useState } from "react";
import { usePago } from "../hooks/usePago";

export default function ModalPago({
  open,
  total,
  onClose,
  onPagar,
  id_cliente,
  id_usuario,
  carrito,
}) {
  const {
    metodo,
    setMetodo,
    pago,
    vuelto,
    loading,
    factura,
    nombreTarjeta,
    setNombreTarjeta,
    numeroTarjeta,
    setNumeroTarjeta,
    vencimiento,
    setVencimiento,
    cvv,
    setCvv,
    handlePagoChange,
    handleConfirmarPago,
  } = usePago({ id_cliente, id_usuario, total, carrito, onPagar });

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
              <b>Cliente:</b> {factura.id_cliente}
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
                <button onClick={() => setMetodo("tarjeta")}>Tarjeta</button>
                <button onClick={() => setMetodo("efectivo")}>Efectivo</button>
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
                <form
                  className="tarjeta-form-grid"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await handleConfirmarPago("tarjeta");
                  }}
                >
                  <div className="tarjeta-form-row">
                    <div>
                      <label>
                        Número tarjeta
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={numeroTarjeta}
                          onChange={(e) =>
                            setNumeroTarjeta(
                              e.target.value.replace(/[^\d ]/g, "")
                            )
                          }
                          placeholder="1234 5678 9012 3456"
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Válida hasta
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={vencimiento}
                          onChange={(e) =>
                            setVencimiento(
                              e.target.value.replace(/[^\d/]/g, "")
                            )
                          }
                          placeholder="mm / aa"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="tarjeta-form-row">
                    <div>
                      <label>
                        Nombre
                        <input
                          type="text"
                          required
                          value={nombreTarjeta}
                          onChange={(e) => setNombreTarjeta(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        CVV
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cvv}
                          onChange={(e) =>
                            setCvv(e.target.value.replace(/[^\d]/g, ""))
                          }
                          placeholder="123"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="tarjeta-form-row">
                    <div style={{ gridColumn: "1 / span 2" }}>
                      <label>
                        Tipo y número de documento
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <select style={{ width: "90px" }}>
                            <option>DNI</option>
                            <option>CUIT</option>
                            <option>Pasaporte</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Documento"
                            style={{ flex: 1 }}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <button
                    className="modal-pago-confirmar"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Procesando..." : "Confirmar pago con tarjeta"}
                  </button>
                </form>
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
                  onClick={() => {
                    handleConfirmarPago("efectivo");
                  }}
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
