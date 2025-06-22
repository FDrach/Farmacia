import { useEffect, useState } from "react";
import axios from "axios";

export default function VentasList() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/ventas")
      .then(res => {
        setVentas(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando ventas...</p>;

  return (
    <div>
      <h3>Ventas registradas</h3>
      {ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        ventas.map((venta) => (
          <div key={venta.venta_id} style={{border: "1px solid #ccc", margin: "1rem 0", padding: "1rem"}}>
            <b>Venta #{venta.venta_id}</b> - {new Date(venta.fecha).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })} <br />
            Cliente: {venta.cliente_nombre} <br />
            Empleado: {venta.empleado_nombre} <br />
            Método de pago: {venta.metodo_pago} <br />
            Total: ${venta.Total} <br />
            <b>Medicamentos vendidos:</b>
            <ul>
              {venta.medicamentos_vendidos.map((med, idx) => (
                <li key={idx}>
                  {med.nombre} x{med.cantidad} - ${med.precio_unitario_venta}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}