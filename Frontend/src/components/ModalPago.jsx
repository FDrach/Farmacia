import { useState } from "react";
import { useObrasSociales } from "../hooks/useObrasSociales";
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
  const { obrasSociales, loading: loadingObras } = useObrasSociales();
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
    obraSocial,
    setObraSocial,
    handlePagoChange,
    handleConfirmarPago,
  } = usePago({ id_cliente, id_usuario, total, carrito, onPagar, obrasSociales });

  if (!open) return null;

  return (
    <div className="modal-pago-backdrop">
      <div
        className={`modal-pago ${
          metodo === "tarjeta"
            ? "modal-pago-tarjeta-wrapper"
            : metodo === "efectivo"
            ? "modal-pago-efectivo-wrapper"
            : ""
        }`}
      >
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
                  {/* Fila 1 */}
                  <label className="tarjeta-form-col-1">
                    Número tarjeta
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={numeroTarjeta}
                      onChange={(e) =>
                        setNumeroTarjeta(e.target.value.replace(/[^\d ]/g, ""))
                      }
                      placeholder="1234 5678 9012 3456"
                    />
                  </label>
                  <label className="tarjeta-form-col-2">
                    Válida hasta
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={vencimiento}
                      onChange={(e) =>
                        setVencimiento(e.target.value.replace(/[^\d/]/g, ""))
                      }
                      placeholder="mm / aa"
                    />
                  </label>
                  {/* Fila 2 */}
                  <label className="tarjeta-form-col-1">
                    Nombre
                    <input
                      type="text"
                      required
                      value={nombreTarjeta}
                      onChange={(e) => setNombreTarjeta(e.target.value)}
                    />
                  </label>
                  <label className="tarjeta-form-col-2">
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

                  {/* Fila 3: Tipo y número de documento */}
                  <div className="tarjeta-form-row-full">
                    <label>
                      Tipo y número de documento
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <select className="select-doc-tipo">
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

                  {/* Fila 4: Obra social */}
                  <div className="tarjeta-form-row-full">
                    <label>
                      Obra social
                      <select
                        value={obraSocial}
                        onChange={(e) => setObraSocial(e.target.value)}
                        required
                        disabled={loadingObras}
                      >
                        <option value="">Seleccione...</option>
                        {obrasSociales.map((os) => (
                          <option key={os.id} value={os.nombre}>
                            {os.nombre}{" "}
                            {os.descuento ? `(${os.descuento * 100}% desc.)` : ""}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* Botón */}
                  <div className="tarjeta-form-row-full">
                    <button
                      className="modal-pago-confirmar"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Procesando..." : "Confirmar pago con tarjeta"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            {metodo === "efectivo" && (
              <div className="modal-pago-efectivo">
                <h2>Efectivo</h2>
                <div className="tarjeta-form-row">
                  <div style={{ gridColumn: "1 / span 2" }}>
                    <label>
                      Obra social
                      <select
                        value={obraSocial}
                        onChange={(e) => setObraSocial(e.target.value)}
                        required
                        disabled={loadingObras}
                      >
                        <option value="">Seleccione...</option>
                        {obrasSociales.map((os) => (
                          <option key={os.id} value={os.nombre}>
                            {os.nombre}{" "}
                            {os.descuento ? `(${os.descuento * 100}% desc.)` : ""}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                <p>
                  Total a pagar:{" "}
                  <b>
                    $
                    {(() => {
                      const os = obrasSociales.find((os) => os.nombre === obraSocial);
                      if (os && os.descuento) {
                        return (total * (1 - os.descuento)).toFixed(2);
                      }
                      return total.toFixed(2);
                    })()}
                  </b>
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
