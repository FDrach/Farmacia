const { connection } = require("../config/db");
function formatDateToMySQL(date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}
const getVentasDetalladas = (req, res) => {
  const query = `
        WITH VentaItems AS (
            SELECT
                vm.id_venta,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'medicamento_id', m.id,
                        'nombre', m.Nombre,
                        'cantidad', vm.cantidad,
                        'precio_unitario_venta', vm.precio_unitario_venta,
                        'descuento_aplicado', vm.descuento_aplicado,
                        'aprobado', (
                            CASE
                                WHEN m.Venta_libre = 1 THEN TRUE
                                ELSE EXISTS (
                                    SELECT 1
                                    FROM Recetas r
                                    WHERE r.id_medicamento = vm.id_medicamento
                                    AND r.id_cliente = (SELECT v_sub.id_cliente FROM Ventas v_sub WHERE v_sub.id = vm.id_venta)
                                )
                            END
                        )
                    )
                ) AS items
            FROM Venta_Medicamento vm
            JOIN Medicamentos m ON vm.id_medicamento = m.id
            GROUP BY vm.id_venta
        )
        SELECT
            v.id AS venta_id,
            v.fecha,
            v.Total,
            v.metodo_pago,
            u.nombre AS empleado_nombre,
            c.Nombre AS cliente_nombre,
            COALESCE(vi.items, '[]') AS medicamentos_vendidos
        FROM Ventas v
        LEFT JOIN Usuarios u ON v.id_usuario = u.id
        LEFT JOIN Clientes c ON v.id_cliente = c.id
        LEFT JOIN VentaItems vi ON v.id = vi.id_venta
        ORDER BY v.fecha DESC;
    `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching detailed sales:", error);
      return res.status(500).json({
        message: "Error fetching sales from the database.",
      });
    }

    const formattedResults = results.map((venta) => {
      const items = JSON.parse(venta.medicamentos_vendidos);
      const formattedItems = items.map((item) => ({
        ...item,
        aprobado: Boolean(item.aprobado),
      }));

      return {
        ...venta,
        medicamentos_vendidos: formattedItems,
      };
    });

    res.status(200).json(formattedResults);
  });
};
async function crearVenta(req, res) {
  try {
    const {
      id_cliente,
      id_usuario,
      total,
      metodo_pago,
      fecha,
      medicamentos_vendidos,
    } = req.body;

    if ([id_usuario, total, metodo_pago].includes(undefined)) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const [result] = await connection
      .promise()
      .execute(
        "INSERT INTO Ventas (id_cliente, id_usuario, Total, fecha, metodo_pago) VALUES (?, ?, ?, ?, ?)",
        [id_cliente, id_usuario, total, fecha, metodo_pago]
      );

    const id_venta = result.insertId;

    if (
      Array.isArray(medicamentos_vendidos) &&
      medicamentos_vendidos.length > 0
    ) {
      for (const med of medicamentos_vendidos) {
        await connection
          .promise()
          .execute(
            "INSERT INTO Venta_Medicamento (id_venta, id_medicamento, cantidad, precio_unitario_venta, descuento_aplicado) VALUES (?, ?, ?, ?, ?)",
            [
              id_venta,
              med.medicamento_id,
              med.cantidad,
              med.precio_unitario_venta,
              med.descuento_aplicado ?? 0,
            ]
          );
      }
    }

    res.json({
      id: id_venta,
      id_cliente,
      id_usuario,
      total,
      fecha,
      metodo_pago,
      medicamentos_vendidos,
    });
  } catch (error) {
    console.error("Error en crearVenta:", error);
    res
      .status(500)
      .json({ error: "Error al registrar la venta", details: error.message });
  }
}

module.exports = {
  getVentasDetalladas,
  crearVenta,
};
