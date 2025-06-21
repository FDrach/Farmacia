const { connection } = require("../config/db");

const getMedicamentosByProveedor = (req, res) => {
  const { id_proveedor } = req.params;
  const query = `
        SELECT mp.id, mp.nombre_proveedor_articulo, mp.precio_compra, mp.stock, m.Nombre as medicamento_base_nombre, m.id as id_medicamento_base
        FROM MedicamentosProv mp
        JOIN Medicamentos m ON mp.id_medicamento_base = m.id
        WHERE mp.id_proveedor = ?
        ORDER BY m.Nombre;
    `;
  connection.query(query, [id_proveedor], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Error al obtener los medicamentos del proveedor." });
    res.status(200).json(results);
  });
};

const addMedicamentoToProveedor = (req, res) => {
  const {
    id_proveedor,
    id_medicamento_base,
    nombre_proveedor_articulo,
    precio_compra,
    stock,
  } = req.body;
  if (!id_proveedor || !id_medicamento_base || !precio_compra)
    return res.status(400).json({ message: "Faltan campos requeridos." });
  const query =
    "INSERT INTO MedicamentosProv (id_proveedor, id_medicamento_base, nombre_proveedor_articulo, precio_compra, stock) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      id_proveedor,
      id_medicamento_base,
      nombre_proveedor_articulo || null,
      precio_compra,
      stock || 0,
    ],
    (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY")
          return res.status(409).json({
            message: "Este medicamento ya está asociado a este proveedor.",
          });
        return res
          .status(500)
          .json({ message: "Error al añadir el medicamento." });
      }
      res.status(201).json({
        message: "Medicamento añadido al proveedor.",
        id: results.insertId,
      });
    }
  );
};

const updateMedicamentoProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre_proveedor_articulo, precio_compra, stock } = req.body;
  if (precio_compra === undefined || stock === undefined)
    return res.status(400).json({ message: "Precio y stock son requeridos." });
  const query =
    "UPDATE MedicamentosProv SET nombre_proveedor_articulo = ?, precio_compra = ?, stock = ? WHERE id = ?";
  connection.query(
    query,
    [nombre_proveedor_articulo || null, precio_compra, stock, id],
    (error, results) => {
      if (error)
        return res.status(500).json({
          message: "Error al actualizar el medicamento del proveedor.",
        });
      if (results.affectedRows === 0)
        return res.status(404).json({
          message: `Medicamento de proveedor con ID ${id} no encontrado.`,
        });
      res
        .status(200)
        .json({ message: "Medicamento de proveedor actualizado." });
    }
  );
};

const removeMedicamentoFromProveedor = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM MedicamentosProv WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2")
        return res.status(409).json({
          message: "No se puede eliminar, el medicamento está en una compra.",
        });
      return res
        .status(500)
        .json({ message: "Error al eliminar el medicamento del proveedor." });
    }
    if (results.affectedRows === 0)
      return res.status(404).json({
        message: `Medicamento de proveedor con ID ${id} no encontrado.`,
      });
    res.status(200).json({ message: "Medicamento eliminado del proveedor." });
  });
};

module.exports = {
  getMedicamentosByProveedor,
  addMedicamentoToProveedor,
  updateMedicamentoProveedor,
  removeMedicamentoFromProveedor,
};
