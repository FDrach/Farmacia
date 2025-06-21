import { useState } from "react";
import { useMedicamentosAdmin } from "../../hooks/useMedicamentosAdmin";

export default function MedicamentosAdmin() {
  const { medicamentos, categorias, loading, error, updateMedicamento } =
    useMedicamentosAdmin();
  const [editingId, setEditingId] = useState(null);

  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-list-container">
      {medicamentos.map((med) => (
        <div key={med.id} className="admin-list-item">
          {editingId === med.id ? (
            <MedicamentoForm
              medicamento={med}
              allCategorias={categorias}
              onSave={updateMedicamento}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <MedicamentoDisplay
              medicamento={med}
              onEdit={() => setEditingId(med.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function MedicamentoDisplay({ medicamento, onEdit }) {
  return (
    <>
      <div className="item-main-info">
        <span className="item-title">{medicamento.Nombre}</span>
        <span className="item-price">${medicamento.precio}</span>
      </div>
      <div className="item-details">
        <p>
          <strong>Stock:</strong> {medicamento.Stock}
        </p>
        <p>
          <strong>Venta Libre:</strong> {medicamento.Venta_libre ? "Sí" : "No"}
        </p>
        <p>
          <strong>Categorías:</strong>{" "}
          {medicamento.categorias.join(", ") || "Ninguna"}
        </p>
      </div>
      <div className="item-actions">
        <button onClick={onEdit} className="btn btn-edit">
          Editar
        </button>
        <button className="btn btn-delete">Eliminar</button>
      </div>
    </>
  );
}

function MedicamentoForm({ medicamento, allCategorias, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    ...medicamento,
    categorias: medicamento.categorias
      .map((catName) => {
        const cat = allCategorias.find((c) => c.nombre === catName);
        return cat ? cat.id : null;
      })
      .filter((id) => id !== null),
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (catId) => {
    setFormData((prev) => {
      const newCategorias = prev.categorias.includes(catId)
        ? prev.categorias.filter((id) => id !== catId)
        : [...prev.categorias, catId];
      return { ...prev, categorias: newCategorias };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      Venta_libre: formData.Venta_libre ? 1 : 0,
    };
    try {
      await onSave(medicamento.id, dataToSubmit);
      onCancel();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        type="text"
        name="Nombre"
        value={formData.Nombre}
        onChange={handleInputChange}
        className="form-input"
      />
      <div className="form-group-inline">
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Precio"
        />
        <input
          type="number"
          name="Stock"
          value={formData.Stock}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Stock"
        />
      </div>
      <div className="form-checkbox-group">
        <label>
          <input
            type="checkbox"
            name="Venta_libre"
            checked={!!formData.Venta_libre}
            onChange={handleInputChange}
          />
          Venta Libre
        </label>
      </div>
      <div className="form-category-group">
        <p>
          <strong>Categorías:</strong>
        </p>
        <div className="category-options">
          {allCategorias.map((cat) => (
            <label key={cat.id} className="category-tag">
              <input
                type="checkbox"
                value={cat.id}
                checked={formData.categorias.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
              />
              {cat.nombre}
            </label>
          ))}
        </div>
      </div>
      <div className="item-actions">
        <button type="submit" className="btn btn-save">
          Guardar
        </button>
        <button type="button" onClick={onCancel} className="btn btn-cancel">
          Cancelar
        </button>
      </div>
    </form>
  );
}
