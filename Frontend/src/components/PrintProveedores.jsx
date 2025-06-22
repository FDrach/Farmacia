import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export default function PrintProveedores({ className = "btn btn-edit" }) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printContent, setPrintContent] = useState(null);

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/proveedores/con-medicamentos`
      );
      const providers = response.data;

      let html = `
                <div class="printable-container">
                    <h1 class="print-title">Lista de Proveedores y Medicamentos</h1>
            `;

      providers.forEach((prov) => {
        html += `
                    <div style="margin-bottom: 2rem; page-break-inside: avoid;">
                        <h2 style="font-size: 16pt; font-weight: bold; border-bottom: 2px solid #000; margin-bottom: 1rem;">${
                          prov.nombre
                        }</h2>
                        <p><strong>CUIL:</strong> ${prov.cuil}</p>
                        <p><strong>Dirección:</strong> ${
                          prov.direccion || "No especificada"
                        }</p>
                `;

        if (prov.medicamentos.length > 0) {
          html += `
                        <h3 style="font-size: 13pt; margin-top: 1rem;">Medicamentos Suministrados:</h3>
                        <table class="print-table">
                            <thead>
                                <tr>
                                    <th>Medicamento Base</th>
                                    <th>Nombre Específico</th>
                                    <th>Precio Compra</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${prov.medicamentos
                                  .map(
                                    (med) => `
                                    <tr>
                                        <td>${med.medicamento_base_nombre}</td>
                                        <td>${
                                          med.nombre_proveedor_articulo || "-"
                                        }</td>
                                        <td>$${med.precio_compra}</td>
                                        <td>${med.stock}</td>
                                    </tr>
                                `
                                  )
                                  .join("")}
                            </tbody>
                        </table>
                    `;
        } else {
          html += `<p style="margin-top: 1rem;"><em>Este proveedor no tiene medicamentos asociados.</em></p>`;
        }
        html += `</div>`;
      });

      html += `</div>`;
      setPrintContent(html);
    } catch (error) {
      console.error("Failed to fetch data for printing:", error);
      alert("No se pudo generar el reporte para imprimir.");
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
        {isPrinting ? "Generando..." : "Imprimir"}
      </button>
      {printContent && (
        <div dangerouslySetInnerHTML={{ __html: printContent }} />
      )}
    </>
  );
}
