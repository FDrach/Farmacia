import { useState } from "react";
import { useMedicamentosAdmin } from "../../hooks/useMedicamentosAdmin";
import PrintButton from "../../components/PrintButton";
import Notificacion from "../../components/Notificacion";
import "../../App.css";

export default function MedicamentosAdmin() {
  const {
    medicamentos,
    categorias,
    loading,
    error,
    addMedicamento,
    updateMedicamento,
    removeMedicamento,
    uploadImage,
  } = useMedicamentosAdmin();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "" });

  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const handleSave = async (data, file) => {
    if (editingId) {
      await updateMedicamento(editingId, data);
      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("medicamentoImage", file);
        await uploadImage(editingId, imageFormData);
      }
      setNotificacion({ visible: true, mensaje: "Artículo actualizado con éxito" });
      // Espera el fade-out antes de actualizar la lista
      setTimeout(() => {
        setEditingId(null); // Esto cierra el form
        setNotificacion({ visible: false, mensaje: "" });
        
      }, 500); // Igual que el tiempo de la animación
    } else {
      const newId = await addMedicamento(data);
      if (file && newId) {
        const imageFormData = new FormData();
        imageFormData.append("medicamentoImage", file);
        await uploadImage(newId, imageFormData);
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro? Esta acción no se puede deshacer.")) {
      removeMedicamento(id).catch((err) => alert(err.message));
    }
  };

  const printColumns = {
    Nombre: "Nombre",
    precio: "Precio",
    Stock: "Stock",
    Venta_libre: "Venta Libre",
    categorias: "Categorías",
  };

  const dataToPrint = medicamentos.map((med) => ({
    ...med,
    Venta_libre: med.Venta_libre ? "Sí" : "No",
    categorias: med.categorias.join(", ") || "N/A",
  }));

  return (
    <div className="admin-list-container">
      <Notificacion mensaje={notificacion.mensaje} visible={notificacion.visible} />
      <div className="admin-list-header">
        <h3>Lista de Medicamentos</h3>
        <div>
          <PrintButton
            data={dataToPrint}
            columns={printColumns}
            title="Lista de Medicamentos"
            className="btn btn-edit"
            style={{ marginRight: "1rem" }}
          />
          {!isAdding && !editingId && (
            <button className="btn btn-save" onClick={() => setIsAdding(true)}>
              Añadir Medicamento
            </button>
          )}
        </div>
      </div>

      {isAdding && (
        <div className="admin-list-item">
          <MedicamentoForm
            allCategorias={categorias}
            onSave={handleSave}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      {medicamentos.map((med) => (
        <div key={med.id} className="admin-list-item">
          {editingId === med.id ? (
            <MedicamentoForm
              medicamento={med}
              allCategorias={categorias}
              onSave={handleSave}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <MedicamentoDisplay
              medicamento={med}
              onEdit={() => {
                setIsAdding(false);
                setEditingId(med.id);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function MedicamentoDisplay({ medicamento, onEdit, onDelete }) {
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
          {medicamento.categorias?.join(", ") || "Ninguna"}
        </p>
      </div>
      <div className="item-actions">
        <button onClick={onEdit} className="btn btn-edit">
          Editar
        </button>
        <button
          onClick={() => onDelete(medicamento.id)}
          className="btn btn-delete"
        >
          Eliminar
        </button>
      </div>
    </>
  );
}

function MedicamentoForm({ medicamento, allCategorias, onSave, onCancel }) {
  const getInitialCategoryIds = () => {
    if (!medicamento || !medicamento.categorias) return [];
    return medicamento.categorias
      .map((catName) => {
        const cat = allCategorias.find((c) => c.nombre === catName);
        return cat ? cat.id : null;
      })
      .filter((id) => id !== null);
  };

  const [formData, setFormData] = useState({
    Nombre: medicamento?.Nombre || "",
    precio: medicamento?.precio || "",
    Stock: medicamento?.Stock || "",
    Venta_libre: medicamento?.Venta_libre || false,
    categorias: getInitialCategoryIds(),
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [closing, setClosing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
      await onSave(dataToSubmit, selectedFile);
      setClosing(true); // Activa la animación
      setTimeout(() => {
        setClosing(false);
        onCancel();
      }, 500); // 500ms para la animación
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`admin-form${closing ? " fade-out" : ""}`}
    >
      <h4 style={{ margin: "0 0 1rem 0", color: "#1f2937" }}>
        {medicamento ? "Editando Medicamento" : "Nuevo Medicamento"}
      </h4>
      <input
        type="text"
        name="Nombre"
        value={formData.Nombre}
        onChange={handleInputChange}
        className="form-input"
        placeholder="Nombre del Medicamento"
        required
      />
      <div className="form-group-inline">
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Precio"
          step="0.01"
          required
        />
        <input
          type="number"
          name="Stock"
          value={formData.Stock}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Stock"
          required
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

      <div className="form-group">
        <label htmlFor="medicamentoImage">
          {medicamento
            ? `Cambiar Imagen (actual: ${medicamento.id}.png)`
            : "Subir Imagen"}
        </label>
        <input
          type="file"
          name="medicamentoImage"
          id="medicamentoImage"
          className="form-input"
          onChange={handleFileChange}
          required={!medicamento}
        />
        {medicamento && (
          <small style={{ color: "#6b7280" }}>
            Dejar en blanco para no modificar la imagen actual.
          </small>
        )}
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
