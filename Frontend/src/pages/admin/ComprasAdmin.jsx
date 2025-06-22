import { useState } from "react";
import { useComprasAdmin } from "../../hooks/useComprasAdmin";
import ModalCompra from "./ModalCompra";
import "../../App.css";

export default function ComprasAdmin() {
  const { medicamentos, proveedoresPorMed, loading, error, realizarCompra } =
    useComprasAdmin();
  const [selectedMed, setSelectedMed] = useState(null);

  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-list-container">
      <div className="admin-list-header">
        <h3>Comprar Medicamentos</h3>
      </div>

      <div className="admin-card-grid">
        {medicamentos.map((med) => (
          <div key={med.id} className="admin-card">
            <div className="item-main-info">
              <span className="item-title">{med.Nombre}</span>
            </div>
            <div className="item-details">
              <p>
                <strong>Stock Actual:</strong>{" "}
                <span className="item-price">{med.Stock}</span>
              </p>
              <p>
                <strong>Categorías:</strong>{" "}
                {med.categorias.join(", ") || "N/A"}
              </p>
            </div>
            <div className="item-actions">
              <button
                className="btn btn-save"
                style={{ width: "100%" }}
                onClick={() => setSelectedMed(med)}
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMed && (
        <ModalCompra
          medicamento={selectedMed}
          proveedores={proveedoresPorMed[selectedMed.id] || []}
          onCompra={realizarCompra}
          onClose={() => setSelectedMed(null)}
        />
      )}
    </div>
  );
}
