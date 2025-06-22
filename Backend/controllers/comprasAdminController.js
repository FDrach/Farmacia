const { connection } = require("../config/db");

const createCompra = (req, res) => {
  const { id_medicamento_prov, id_medicamento_base, cantidad, id_usuario } =
    req.body;

  if (
    !id_medicamento_prov ||
    !id_medicamento_base ||
    !cantidad ||
    !id_usuario
  ) {
    return res.status(400).json({ message: "Faltan datos para la compra." });
  }

  const purchaseQuantity = parseInt(cantidad, 10);
  if (isNaN(purchaseQuantity) || purchaseQuantity <= 0) {
    return res
      .status(400)
      .json({ message: "La cantidad debe ser un número positivo." });
  }

  connection.beginTransaction((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al iniciar la transacción." });
    }

    const getDetailsQuery = `
        SELECT stock, precio_compra, id_proveedor 
        FROM MedicamentosProv 
        WHERE id = ? FOR UPDATE;
    `;

    connection.query(getDetailsQuery, [id_medicamento_prov], (err, results) => {
      if (err) {
        return connection.rollback(() =>
          res.status(500).json({
            message: "Error al verificar el medicamento del proveedor.",
          })
        );
      }
      if (results.length === 0) {
        return connection.rollback(() =>
          res.status(404).json({
            message: "El medicamento no fue encontrado para este proveedor.",
          })
        );
      }

      const medProv = results[0];
      if (medProv.stock < purchaseQuantity) {
        return connection.rollback(() =>
          res.status(409).json({
            message: `Stock insuficiente del proveedor. Disponible: ${medProv.stock}`,
          })
        );
      }

      const totalCompra = medProv.precio_compra * purchaseQuantity;

      const insertCompraQuery =
        "INSERT INTO Compras (id_proveedor, id_usuario, Total) VALUES (?, ?, ?)";
      connection.query(
        insertCompraQuery,
        [medProv.id_proveedor, id_usuario, totalCompra],
        (err, compraResult) => {
          if (err) {
            return connection.rollback(() =>
              res.status(500).json({ message: "Error al registrar la compra." })
            );
          }

          const newCompraId = compraResult.insertId;

          const insertJunctionQuery =
            "INSERT INTO Compra_Medicamento (id_compra, id_medicamento_prov, cantidad, precio_unitario_compra) VALUES (?, ?, ?, ?)";
          connection.query(
            insertJunctionQuery,
            [
              newCompraId,
              id_medicamento_prov,
              purchaseQuantity,
              medProv.precio_compra,
            ],
            (err) => {
              if (err) {
                return connection.rollback(() =>
                  res
                    .status(500)
                    .json({ message: "Error al detallar la compra." })
                );
              }

              const updateProvStockQuery =
                "UPDATE MedicamentosProv SET stock = stock - ? WHERE id = ?";
              connection.query(
                updateProvStockQuery,
                [purchaseQuantity, id_medicamento_prov],
                (err) => {
                  if (err) {
                    return connection.rollback(() =>
                      res.status(500).json({
                        message: "Error al actualizar el stock del proveedor.",
                      })
                    );
                  }

                  const updateMainStockQuery =
                    "UPDATE Medicamentos SET Stock = Stock + ? WHERE id = ?";
                  connection.query(
                    updateMainStockQuery,
                    [purchaseQuantity, id_medicamento_base],
                    (err) => {
                      if (err) {
                        return connection.rollback(() =>
                          res.status(500).json({
                            message: "Error al actualizar el stock principal.",
                          })
                        );
                      }

                      connection.commit((commitErr) => {
                        if (commitErr) {
                          return connection.rollback(() =>
                            res.status(500).json({
                              message: "Error al finalizar la compra.",
                            })
                          );
                        }
                        res
                          .status(201)
                          .json({ message: "Compra realizada exitosamente." });
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
};

module.exports = { createCompra };
