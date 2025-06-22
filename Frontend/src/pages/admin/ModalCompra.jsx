import { useState } from "react";
import useAuthStore from "../../store/authStore";

export default function ModalCompra({
  medicamento,
  proveedores,
  onCompra,
  onClose,
}) {
  const [cantidad, setCantidad] = useState(1);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(
    proveedores[0] || null
  );
  const { usuario } = useAuthStore();

  if (!medicamento || !proveedores || proveedores.length === 0) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h3>Comprar {medicamento.Nombre}</h3>
          <p>Este medicamento no está disponible en ningún proveedor.</p>
          <div className="item-actions">
            <button onClick={onClose} className="btn btn-cancel">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCompra = async () => {
    if (cantidad > proveedorSeleccionado.stock) {
      alert(
        `Stock insuficiente. El proveedor solo tiene ${proveedorSeleccionado.stock} unidades.`
      );
      return;
    }
    const compraData = {
      id_medicamento_prov: proveedorSeleccionado.id_medicamento_prov,
      id_medicamento_base: medicamento.id,
      cantidad: cantidad,
      id_usuario: usuario.id,
    };
    try {
      await onCompra(compraData);
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleProviderChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    setProveedorSeleccionado(
      proveedores.find((p) => p.id_medicamento_prov === selectedId)
    );
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Comprar: {medicamento.Nombre}</h3>
        <div className="admin-form">
          <label>
            Seleccionar Proveedor:
            <select
              className="form-input"
              onChange={handleProviderChange}
              value={proveedorSeleccionado.id_medicamento_prov}
            >
              {proveedores.map((p) => (
                <option
                  key={p.id_medicamento_prov}
                  value={p.id_medicamento_prov}
                >
                  {p.proveedor_nombre} - Stock: {p.stock} - Precio: $
                  {p.precio_compra}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cantidad a Comprar:
            <input
              type="number"
              className="form-input"
              value={cantidad}
              onChange={(e) =>
                setCantidad(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
              max={proveedorSeleccionado.stock}
            />
          </label>
          <div className="item-actions">
            <button onClick={handleCompra} className="btn btn-save">
              Confirmar Compra
            </button>
            <button onClick={onClose} className="btn btn-cancel">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
