import { useState } from "react";
import { useClientesAdmin } from "../../hooks/useClientesAdmin";
import PrintButton from "../../components/PrintButton";
import "../../App.css";

function ClienteForm({
  cliente,
  obrasSociales,
  onSave,
  onCancel,
  onAddObraSocial,
}) {
  const [formData, setFormData] = useState({
    Nombre: cliente?.Nombre || "",
    dni: cliente?.dni || "",
    id_obra_social: cliente?.id_obra_social || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id_obra_social" && value === "add_new") {
      const nombre = prompt("Nombre de la nueva obra social:");
      const descuento = prompt("Descuento (ej. 0.40 para 40%):");
      if (nombre && descuento) {
        onAddObraSocial({ nombre, descuento })
          .then((newId) => {
            setFormData((prev) => ({ ...prev, id_obra_social: newId }));
          })
          .catch(setError);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSave(formData);
      onCancel();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{cliente ? "Editar Cliente" : "Añadir Nuevo Cliente"}</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            placeholder="Nombre Completo"
            required
          />
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder="DNI"
            required
          />
          <select
            name="id_obra_social"
            value={formData.id_obra_social}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccione una Obra Social
            </option>
            {obrasSociales.map((os) => (
              <option key={os.id} value={os.id}>
                {os.nombre}
              </option>
            ))}
            <option
              value="add_new"
              style={{ fontStyle: "italic", color: "blue" }}
            >
              + Añadir nueva...
            </option>
          </select>
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

export default function ClientesAdmin() {
  const {
    clientes,
    obrasSociales,
    loading,
    error,
    addCliente,
    updateCliente,
    removeCliente,
    addObraSocial,
  } = useClientesAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);

  if (loading) return <p className="loading-message">Cargando clientes...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const printColumns = {
    Nombre: "Nombre",
    dni: "DNI",
    obra_social_nombre: "Obra Social",
  };

  const handleOpenModal = (cliente = null) => {
    setCurrentCliente(cliente);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCliente(null);
  };

  const handleSave = (data) => {
    const action = currentCliente
      ? updateCliente(currentCliente.id, data)
      : addCliente(data);
    action.catch((err) => alert(err.message)).finally(handleCloseModal);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este cliente?")) {
      removeCliente(id).catch((err) => alert(err.message));
    }
  };

  return (
    <div className="admin-list-container">
      <div className="admin-list-header">
        <h3>Lista de Clientes</h3>
        <div>
          {/* Use the new PrintButton component */}
          <PrintButton
            data={clientes}
            columns={printColumns}
            title="Lista de Clientes"
            className="btn btn-edit"
            style={{ marginRight: "1rem" }}
          />
          <button className="btn btn-save" onClick={() => handleOpenModal()}>
            Añadir Cliente
          </button>
        </div>
      </div>
      {clientes.map((cliente) => (
        <div key={cliente.id} className="admin-list-item">
          <div className="item-main-info">
            <span className="item-title">{cliente.Nombre}</span>
            <span className="item-price">{cliente.obra_social_nombre}</span>
          </div>
          <div className="item-details">
            <p>
              <strong>DNI:</strong> {cliente.dni}
            </p>
          </div>
          <div className="item-actions">
            <button
              onClick={() => handleOpenModal(cliente)}
              className="btn btn-edit"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(cliente.id)}
              className="btn btn-delete"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <ClienteForm
          cliente={currentCliente}
          obrasSociales={obrasSociales}
          onSave={handleSave}
          onCancel={handleCloseModal}
          onAddObraSocial={addObraSocial}
        />
      )}
    </div>
  );
}
