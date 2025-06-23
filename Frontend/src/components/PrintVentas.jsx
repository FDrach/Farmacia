import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export default function PrintVentas({ className = "btn btn-edit" }) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printContent, setPrintContent] = useState(null);

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/ventas`);
      const ventas = response.data;

      let html = `
                <div class="printable-container">
                    <h1 class="print-title">Reporte de Ventas</h1>
            `;

      ventas.forEach((venta) => {
        html += `
                    <div style="margin-bottom: 2rem; page-break-inside: avoid;">
                        <h2 style="font-size: 16pt; font-weight: bold; border-bottom: 2px solid #000; margin-bottom: 1rem;">
                            Venta #${venta.venta_id} - ${new Date(
          venta.fecha
        ).toLocaleString("es-AR")}
                        </h2>
                        <p><strong>Cliente:</strong> ${
                          venta.cliente_nombre || "Consumidor Final"
                        }</p>
                        <p><strong>Empleado:</strong> ${
                          venta.empleado_nombre || "N/A"
                        }</p>
                        <p><strong>Total:</strong> $${venta.Total}</p>
                        <p><strong>Método de Pago:</strong> ${
                          venta.metodo_pago
                        }</p>
                `;

        if (venta.medicamentos_vendidos.length > 0) {
          html += `
                        <table class="print-table print-nested-table">
                            <thead>
                                <tr>
                                    <th>Medicamento</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unit.</th>
                                    <th>Aprobado</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${venta.medicamentos_vendidos
                                  .map(
                                    (med) => `
                                    <tr>
                                        <td>${med.nombre}</td>
                                        <td>${med.cantidad}</td>
                                        <td>$${med.precio_unitario_venta}</td>
                                        <td>${med.aprobado ? "Sí" : "No"}</td>
                                    </tr>
                                `
                                  )
                                  .join("")}
                            </tbody>
                        </table>
                    `;
        }
        html += `</div>`;
      });

      html += `</div>`;
      setPrintContent(html);
    } catch (error) {
      console.error("Failed to fetch data for printing sales:", error);
      alert("No se pudo generar el reporte de ventas para imprimir.");
    } finally {
      setIsPrinting(false);
    }
  };

  useEffect(() => {
    if (printContent) {
      window.print();
      setPrintContent(null);
    }
  }, [printContent]);

  return (
    <>
      <button className={className} onClick={handlePrint} disabled={isPrinting}>
        {isPrinting ? "Generando..." : "Imprimir Reporte"}
      </button>
      {printContent && (
        <div dangerouslySetInnerHTML={{ __html: printContent }} />
      )}
    </>
  );
}
