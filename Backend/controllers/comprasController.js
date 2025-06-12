const { connection } = require("../config/db");

const executeComprasQuery = (res, whereClause = "", params = []) => {
  const query = `
        WITH CompraItems AS (
            SELECT
                cm.id_compra,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'medicamento_base_id', m.id,
                        'medicamento_base_nombre', m.Nombre,
                        'nombre_proveedor_articulo', mp.nombre_proveedor_articulo,
                        'cantidad', cm.cantidad,
                        'precio_unitario_compra', cm.precio_unitario_compra
                    )
                ) AS items
            FROM Compra_Medicamento cm
            JOIN MedicamentosProv mp ON cm.id_medicamento_prov = mp.id
            JOIN Medicamentos m ON mp.id_medicamento_base = m.id
            GROUP BY cm.id_compra
        )
        SELECT
            c.id AS compra_id,
            c.fecha,
            c.Total,
            p.nombre AS proveedor_nombre,
            u.nombre AS usuario_nombre,
            COALESCE(ci.items, '[]') AS items_comprados
        FROM Compras c
        LEFT JOIN Proveedores p ON c.id_proveedor = p.id
        LEFT JOIN Usuarios u ON c.id_usuario = u.id
        LEFT JOIN CompraItems ci ON c.id = ci.id_compra
        ${whereClause}
        ORDER BY c.fecha DESC;
    `;

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error("Error executing purchases query:", error);
      return res
        .status(500)
        .json({ message: "Error fetching purchases from the database." });
    }

    if (results.length === 0 && params.length > 0) {
      return res
        .status(404)
        .json({ message: "No purchases found with the given criteria." });
    }

    const formattedResults = results.map((compra) => ({
      ...compra,
      items_comprados: JSON.parse(compra.items_comprados),
    }));

    res.status(200).json(formattedResults);
  });
};

const getComprasDetalladas = (req, res) => {
  executeComprasQuery(res);
};

const getCompraById = (req, res) => {
  const { id } = req.params;
  const whereClause = "WHERE c.id = ?";
  executeComprasQuery(res, whereClause, [id]);
};

const getComprasByProveedor = (req, res) => {
  const { id_proveedor } = req.params;
  const whereClause = "WHERE c.id_proveedor = ?";
  executeComprasQuery(res, whereClause, [id_proveedor]);
};

const getComprasByUsuario = (req, res) => {
  const { id_usuario } = req.params;
  const whereClause = "WHERE c.id_usuario = ?";
  executeComprasQuery(res, whereClause, [id_usuario]);
};

module.exports = {
  getComprasDetalladas,
  getCompraById,
  getComprasByProveedor,
  getComprasByUsuario,
};
