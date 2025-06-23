import { useEffect, useState } from "react";
import axios from "axios";
import PrintVentas from "./PrintVentas";
import "../App.css";

export default function VentasList() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/ventas")
      .then((res) => {
        setVentas(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading-message">Cargando ventas...</p>;

  return (
    <div className="admin-list-container">
      <div className="admin-list-header">
        <h3>Historial de Ventas</h3>
        {/* Add the print button here */}
        <PrintVentas />
      </div>

      {ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        ventas.map((venta) => (
          <div key={venta.venta_id} className="admin-list-item">
            <div className="item-main-info">
              <span className="item-title">Venta #{venta.venta_id}</span>
              <span className="item-price">${venta.Total}</span>
            </div>
            <div className="item-details">
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(venta.fecha).toLocaleString("es-AR")}
              </p>
              <p>
                <strong>Cliente:</strong>{" "}
                {venta.cliente_nombre || "Consumidor Final"}
              </p>
              <p>
                <strong>Empleado:</strong> {venta.empleado_nombre || "N/A"}
              </p>
              <p>
                <strong>Método de pago:</strong> {venta.metodo_pago}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
