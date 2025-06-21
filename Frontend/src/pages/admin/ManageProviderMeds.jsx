import { useState, useEffect } from "react";

function MedRow({ med, onSave, onDelete, allMeds }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(med);

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return isEditing ? (
    <tr>
      <td>{med.medicamento_base_nombre}</td>
      <td>
        <input
          type="text"
          className="form-input"
          value={formData.nombre_proveedor_articulo || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              nombre_proveedor_articulo: e.target.value,
            })
          }
          placeholder="Nombre Específico"
        />
      </td>
      <td>
        <input
          type="number"
          step="0.01"
          className="form-input"
          value={formData.precio_compra}
          onChange={(e) =>
            setFormData({ ...formData, precio_compra: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="number"
          className="form-input"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
      </td>
      <td>
        <button onClick={handleSave} className="btn btn-save">
          ✓
        </button>
        <button onClick={() => setIsEditing(false)} className="btn btn-cancel">
          ✗
        </button>
      </td>
    </tr>
  ) : (
    <tr>
      <td>{med.medicamento_base_nombre}</td>
      <td>{med.nombre_proveedor_articulo || "-"}</td>
      <td>${med.precio_compra}</td>
      <td>{med.stock}</td>
      <td>
        <button onClick={() => setIsEditing(true)} className="btn btn-edit">
          ✎
        </button>
        <button onClick={() => onDelete(med.id)} className="btn btn-delete">
          🗑
        </button>
      </td>
    </tr>
  );
}

function AddMedForm({ providerId, onSave, allMeds, existingMeds }) {
  const [newData, setNewData] = useState({
    id_medicamento_base: "",
    nombre_proveedor_articulo: "",
    precio_compra: "",
    stock: 0,
  });
  const availableMeds = allMeds.filter(
    (m) => !existingMeds.some((em) => em.id_medicamento_base === m.id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...newData, id_proveedor: providerId });
    setNewData({
      id_medicamento_base: "",
      nombre_proveedor_articulo: "",
      precio_compra: "",
      stock: 0,
    });
  };

  return (
    <tfoot>
      <tr>
        <td>
          <select
            value={newData.id_medicamento_base}
            onChange={(e) =>
              setNewData({ ...newData, id_medicamento_base: e.target.value })
            }
            className="form-input"
            required
          >
            <option value="">Seleccionar Medicamento</option>
            {availableMeds.map((m) => (
              <option key={m.id} value={m.id}>
                {m.Nombre}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="text"
            value={newData.nombre_proveedor_articulo}
            onChange={(e) =>
              setNewData({
                ...newData,
                nombre_proveedor_articulo: e.target.value,
              })
            }
            placeholder="Nombre (opcional)"
            className="form-input"
          />
        </td>
        <td>
          <input
            type="number"
            step="0.01"
            value={newData.precio_compra}
            onChange={(e) =>
              setNewData({ ...newData, precio_compra: e.target.value })
            }
            placeholder="Precio Compra"
            className="form-input"
            required
          />
        </td>
        <td>
          <input
            type="number"
            value={newData.stock}
            onChange={(e) => setNewData({ ...newData, stock: e.target.value })}
            placeholder="Stock"
            className="form-input"
            required
          />
        </td>
        <td>
          <button onClick={handleSubmit} className="btn btn-save">
            Añadir
          </button>
        </td>
      </tr>
    </tfoot>
  );
}

export default function ManageProviderMeds({
  provider,
  allMeds,
  hook,
  onClose,
}) {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hook
      .getMedsByProvider(provider.id)
      .then(setMeds)
      .finally(() => setLoading(false));
  }, [provider.id, hook]);

  const handleSave = async (medData) => {
    await hook.updateMedFromProvider(medData.id, medData);
    hook.getMedsByProvider(provider.id).then(setMeds);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Seguro que desea quitar este medicamento del proveedor?")
    ) {
      await hook.removeMedFromProvider(id);
      hook.getMedsByProvider(provider.id).then(setMeds);
    }
  };

  const handleAdd = async (newData) => {
    await hook.addMedToProvider(newData);
    hook.getMedsByProvider(provider.id).then(setMeds);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: "800px" }}>
        <h3>Medicamentos de: {provider.nombre}</h3>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Medicamento Base</th>
                <th>Nombre Específico</th>
                <th>Precio Compra</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {meds.map((med) => (
                <MedRow
                  key={med.id}
                  med={med}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
            <AddMedForm
              providerId={provider.id}
              onSave={handleAdd}
              allMeds={allMeds}
              existingMeds={meds}
            />
          </table>
        )}
        <div className="item-actions">
          <button onClick={onClose} className="btn btn-cancel">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
