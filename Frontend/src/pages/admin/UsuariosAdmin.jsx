import { useState } from "react";
import { useUsuariosAdmin } from "../../hooks/useUsuariosAdmin";
import "../../App.css";

function UsuarioForm({ usuario, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    dni: usuario?.dni || "",
    nombre: usuario?.nombre || "",
    tipo: usuario?.tipo || "Cajero",
    Horario: usuario?.Horario || "Mañana",
    Sueldo: usuario?.Sueldo || "",
    usuario: usuario?.usuario || "",
    contrasena: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const dataToSend = { ...formData };
      if (usuario && !formData.contrasena) {
        delete dataToSend.contrasena;
      } else if (!usuario && !formData.contrasena) {
        setError("La contraseña es obligatoria para nuevos usuarios.");
        return;
      }
      await onSave(dataToSend);
      onCancel();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{usuario ? "Editar Usuario" : "Crear Nuevo Usuario"}</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
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
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="Administrador">Administrador</option>
            <option value="Farmacéutico">Farmacéutico</option>
            <option value="Cajero">Cajero</option>
            <option value="Repositor">Repositor</option>
            <option value="Atención al Cliente">Atención al Cliente</option>
          </select>
          <select
            name="Horario"
            value={formData.Horario}
            onChange={handleChange}
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
            <option value="Completo">Completo</option>
            <option value="Fines de Semana">Fines de Semana</option>
          </select>
          <input
            type="number"
            name="Sueldo"
            value={formData.Sueldo}
            onChange={handleChange}
            placeholder="Sueldo"
            required
          />
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            required
          />
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            placeholder={usuario ? "Nueva contraseña (opcional)" : "Contraseña"}
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

export default function UsuariosAdmin() {
  const { usuarios, loading, error, addUser, updateUser, removeUser } =
    useUsuariosAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  if (loading) return <p className="loading-message">Cargando usuarios...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const handleOpenModal = (usuario = null) => {
    setCurrentUser(usuario);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleSave = (data) => {
    if (currentUser) {
      return updateUser(currentUser.id, data);
    } else {
      return addUser(data);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
      removeUser(id);
    }
  };

  return (
    <div className="admin-list-container">
      <div className="admin-list-header">
        <h3>Lista de Usuarios</h3>
        <button className="btn btn-save" onClick={() => handleOpenModal()}>
          Añadir Usuario
        </button>
      </div>

      {usuarios.map((user) => (
        <div key={user.id} className="admin-list-item">
          <div className="item-main-info">
            <span className="item-title">
              {user.nombre} ({user.usuario})
            </span>
            <span className="item-price">{user.tipo}</span>
          </div>
          <div className="item-details">
            <p>
              <strong>DNI:</strong> {user.dni}
            </p>
            <p>
              <strong>Horario:</strong> {user.Horario}
            </p>
            <p>
              <strong>Sueldo:</strong> ${user.Sueldo}
            </p>
          </div>
          <div className="item-actions">
            <button
              onClick={() => handleOpenModal(user)}
              className="btn btn-edit"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="btn btn-delete"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <UsuarioForm
          usuario={currentUser}
          onSave={handleSave}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}
