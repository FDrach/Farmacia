import { useState } from "react";
import { useCategoriasAdmin } from "../../hooks/useCategoriasAdmin";

export default function CategoriasAdmin() {
  const {
    categorias,
    loading,
    error,
    addCategoria,
    updateCategoria,
    removeCategoria,
  } = useCategoriasAdmin();
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [newName, setNewName] = useState("");
  const [actionError, setActionError] = useState(null);

  if (loading) return <p className="loading-message">Cargando categorías...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const handleEditClick = (categoria) => {
    setEditingId(categoria.id);
    setEditingName(categoria.nombre);
    setActionError(null);
  };

  const handleSaveClick = async (id) => {
    if (!editingName.trim()) {
      setActionError("El nombre no puede estar vacío.");
      return;
    }
    try {
      await updateCategoria(id, editingName);
      setEditingId(null);
      setEditingName("");
      setActionError(null);
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleAddClick = async () => {
    if (!newName.trim()) {
      setActionError("El nombre no puede estar vacío.");
      return;
    }
    try {
      await addCategoria(newName);
      setNewName("");
      setActionError(null);
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDeleteClick = async (id) => {
    if (
      window.confirm(
        "¿Está seguro de que desea eliminar esta categoría? Esta acción no se puede deshacer."
      )
    ) {
      try {
        await removeCategoria(id);
        setActionError(null);
      } catch (err) {
        setActionError(err.message);
      }
    }
  };

  return (
    <div className="admin-list-container">
      {actionError && (
        <p className="error-message" style={{ marginBottom: "1rem" }}>
          {actionError}
        </p>
      )}

      {/* Form to add a new category */}
      <div className="admin-list-item">
        <div className="admin-form-inline">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre de la nueva categoría"
            className="form-input"
          />
          <button onClick={handleAddClick} className="btn btn-save">
            Añadir
          </button>
        </div>
      </div>

      {/* List of existing categories */}
      {categorias.map((cat) => (
        <div key={cat.id} className="admin-list-item">
          {editingId === cat.id ? (
            <div className="admin-form-inline">
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="form-input"
              />
              <button
                onClick={() => handleSaveClick(cat.id)}
                className="btn btn-save"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="btn btn-cancel"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="item-main-info">
              <span className="item-title">{cat.nombre}</span>
              <div className="item-actions">
                <button
                  onClick={() => handleEditClick(cat)}
                  className="btn btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteClick(cat.id)}
                  className="btn btn-delete"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
