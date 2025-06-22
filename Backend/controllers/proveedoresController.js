const { connection } = require("../config/db");

const getProveedores = (req, res) => {
  const query = "SELECT * FROM Proveedores ORDER BY nombre";
  connection.query(query, (error, results) => {
    if (error)
      return res.status(500).json({ message: "Error al obtener proveedores." });
    res.status(200).json(results);
  });
};

const createProveedor = (req, res) => {
  const { nombre, direccion, cuil } = req.body;
  if (!nombre || !cuil)
    return res.status(400).json({ message: "Nombre y CUIL son requeridos." });
  const query =
    "INSERT INTO Proveedores (nombre, direccion, cuil) VALUES (?, ?, ?)";
  connection.query(
    query,
    [nombre, direccion || null, cuil],
    (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY")
          return res
            .status(409)
            .json({ message: "El CUIL ya está registrado." });
        return res
          .status(500)
          .json({ message: "Error al crear el proveedor." });
      }
      res
        .status(201)
        .json({ message: "Proveedor creado.", id: results.insertId });
    }
  );
};

const updateProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, cuil } = req.body;
  if (!nombre || !cuil)
    return res.status(400).json({ message: "Nombre y CUIL son requeridos." });
  const query =
    "UPDATE Proveedores SET nombre = ?, direccion = ?, cuil = ? WHERE id = ?";
  connection.query(
    query,
    [nombre, direccion || null, cuil, id],
    (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY")
          return res.status(409).json({ message: "El CUIL ya está en uso." });
        return res
          .status(500)
          .json({ message: "Error al actualizar el proveedor." });
      }
      if (results.affectedRows === 0)
        return res
          .status(404)
          .json({ message: `Proveedor con ID ${id} no encontrado.` });
      res.status(200).json({ message: "Proveedor actualizado." });
    }
  );
};

const deleteProveedor = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Proveedores WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2")
        return res.status(409).json({
          message:
            "No se puede eliminar, el proveedor tiene compras o medicamentos asociados.",
        });
      return res
        .status(500)
        .json({ message: "Error al eliminar el proveedor." });
    }
    if (results.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `Proveedor con ID ${id} no encontrado.` });
    res.status(200).json({ message: "Proveedor eliminado." });
  });
};

const getProveedoresConMedicamentos = (req, res) => {
  const query = `
      SELECT
          p.id,
          p.nombre,
          p.direccion,
          p.cuil,
          COALESCE(pm.medicamentos, '[]') AS medicamentos
      FROM
          Proveedores p
      LEFT JOIN (
          SELECT
              mp.id_proveedor,
              JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'medicamento_base_nombre', m.Nombre,
                      'nombre_proveedor_articulo', mp.nombre_proveedor_articulo,
                      'precio_compra', mp.precio_compra,
                      'stock', mp.stock
                  )
              ) AS medicamentos
          FROM MedicamentosProv mp
          JOIN Medicamentos m ON mp.id_medicamento_base = m.id
          GROUP BY mp.id_proveedor
      ) AS pm ON p.id = pm.id_proveedor
      ORDER BY p.nombre;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching providers with medications:", error);
      return res
        .status(500)
        .json({ message: "Error al obtener los datos de proveedores." });
    }

    const formattedResults = results.map((provider) => ({
      ...provider,
      medicamentos: JSON.parse(provider.medicamentos),
    }));

    res.status(200).json(formattedResults);
  });
};

module.exports = {
  getProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
  getProveedoresConMedicamentos,
};
