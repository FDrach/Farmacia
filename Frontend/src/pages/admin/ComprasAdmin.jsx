import { useState, useMemo } from "react";
import { useComprasAdmin } from "../../hooks/useComprasAdmin";
import ModalCompra from "./ModalCompra";
import "../../App.css";

export default function ComprasAdmin() {
  const { medicamentos, proveedoresPorMed, loading, error, realizarCompra } =
    useComprasAdmin();
  const [selectedMed, setSelectedMed] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedicamentos = useMemo(() => {
    if (!searchTerm) {
      return medicamentos;
    }

    const searchKeywords = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((word) => word);

    return medicamentos.filter((med) => {
      const medNombre = med.Nombre.toLowerCase();

      return searchKeywords.every((keyword) => medNombre.includes(keyword));
    });
  }, [medicamentos, searchTerm]);

  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-list-container">
      <div className="admin-list-header">
        <h3>Comprar Medicamentos</h3>
        {/* Search Input Field */}
        <div className="navbar-search" style={{ maxWidth: "350px" }}>
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Buscar medicamento por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="navbar-search-btn" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="admin-card-grid">
        {/* Map over the filtered list instead of the original one performance goes broom broom */}
        {filteredMedicamentos.length > 0 ? (
          filteredMedicamentos.map((med) => (
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
          ))
        ) : (
          <p>No se encontraron medicamentos que coincidan con la búsqueda.</p>
        )}
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
