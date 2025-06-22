import { useState } from "react";
import { useProveedoresAdmin } from "../../hooks/useProveedoresAdmin";
import ManageProviderMeds from "./ManageProviderMeds";
import PrintProveedores from "../../components/PrintProveedores";
import "../../App.css";

function ProveedorForm({ proveedor, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: proveedor?.nombre || "",
    direccion: proveedor?.direccion || "",
    cuil: proveedor?.cuil || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{proveedor ? "Editar Proveedor" : "Añadir Proveedor"}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            placeholder="Nombre del Proveedor"
            required
          />
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={(e) =>
              setFormData({ ...formData, direccion: e.target.value })
            }
            placeholder="Dirección"
          />
          <input
            type="text"
            name="cuil"
            value={formData.cuil}
            onChange={(e) => setFormData({ ...formData, cuil: e.target.value })}
            placeholder="CUIL"
            required
          />
          <div className="item-actions">
            <button type="submit" className="btn btn-save">
              Guardar
            </button>
            <button type="button" onClick={onCancel} className="btn btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProveedoresAdmin() {
  const hook = useProveedoresAdmin();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMedsOpen, setIsMedsOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);

  const handleOpenForm = (prov = null) => {
    setCurrentProvider(prov);
    setIsFormOpen(true);
  };

  const handleOpenMeds = (prov) => {
    setCurrentProvider(prov);
    setIsMedsOpen(true);
  };

  const handleSaveProvider = (data) => {
    const action = currentProvider
      ? hook.updateProveedor(currentProvider.id, data)
      : hook.addProveedor(data);
    action
      .catch((err) => alert(err.message))
      .finally(() => setIsFormOpen(false));
  };

  const handleDeleteProvider = (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este proveedor?")) {
      hook.removeProveedor(id).catch((err) => alert(err.message));
    }
  };

  if (hook.loading) return <p className="loading-message">Cargando...</p>;
  if (hook.error) return <p className="error-message">{hook.error}</p>;

  return (
    <div className="admin-list-container">
      <div className="admin-list-header">
        <h3>Lista de Proveedores</h3>
        <div>
          {/* Use the new PrintProveedores component */}
          <PrintProveedores style={{ marginRight: "1rem" }} />
          <button className="btn btn-save" onClick={() => handleOpenForm()}>
            Añadir Proveedor
          </button>
        </div>
      </div>
      {hook.proveedores.map((prov) => (
        <div key={prov.id} className="admin-list-item">
          <div className="item-main-info">
            <span className="item-title">{prov.nombre}</span>
            <span className="item-price">{prov.cuil}</span>
          </div>
          <div className="item-details">
            <p>
              <strong>Dirección:</strong> {prov.direccion || "No especificada"}
            </p>
          </div>
          <div className="item-actions">
            <button
              onClick={() => handleOpenMeds(prov)}
              className="btn btn-edit"
            >
              Administrar Medicamentos
            </button>
            <button
              onClick={() => handleOpenForm(prov)}
              className="btn btn-edit"
            >
              Editar Proveedor
            </button>
            <button
              onClick={() => handleDeleteProvider(prov.id)}
              className="btn btn-delete"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {isFormOpen && (
        <ProveedorForm
          proveedor={currentProvider}
          onSave={handleSaveProvider}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      {isMedsOpen && (
        <ManageProviderMeds
          provider={currentProvider}
          allMeds={hook.medicamentosBase}
          hook={hook}
          onClose={() => setIsMedsOpen(false)}
        />
      )}
    </div>
  );
}
