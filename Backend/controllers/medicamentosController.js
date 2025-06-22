const { connection } = require("../config/db");

const getMedicamentosConCategorias = (req, res) => {
  const query = `
        SELECT * from vista_medicamentos_categorias
    `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching medications:", error);
      return res.status(500).json({
        message: "Error fetching medications from the database.",
      });
    }

    const formattedResults = results.map((medicamento) => ({
      ...medicamento,
      Venta_libre: Boolean(medicamento.Venta_libre),
      categorias: JSON.parse(medicamento.categorias),
    }));

    res.status(200).json(formattedResults);
  });
};

const getMedicamentoById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required." });
  }

  const query = `CALL get_medicamentos_by_id(?)`;

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching medication by ID:", error);
      return res.status(500).json({
        message: "Error fetching medication from the database.",
      });
    }

    const medicationData = results[0];

    if (!medicationData || medicationData.length === 0) {
      return res
        .status(404)
        .json({ message: `Medicamento with ID ${id} not found.` });
    }

    const formattedResult = {
      ...medicationData[0],
      Venta_libre: Boolean(medicationData[0].Venta_libre),
      categorias: JSON.parse(medicationData[0].categorias),
    };

    res.status(200).json(formattedResult);
  });
};

const updateMedicamento = (req, res) => {
  const { id } = req.params;
  const {
    Nombre,
    precio,
    Stock,
    Venta_libre,
    categorias: newCategoryIds,
  } = req.body;

  if (
    !Nombre ||
    precio === undefined ||
    Stock === undefined ||
    Venta_libre === undefined ||
    !Array.isArray(newCategoryIds)
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ message: "Server error." });
    }

    const medQuery =
      "UPDATE Medicamentos SET Nombre = ?, precio = ?, Stock = ?, Venta_libre = ? WHERE id = ?";
    connection.query(
      medQuery,
      [Nombre, precio, Stock, Venta_libre, id],
      (medErr, medResults) => {
        if (medErr) {
          return connection.rollback(() => {
            console.error("Error updating medication:", medErr);
            res
              .status(500)
              .json({ message: "Error updating medication details." });
          });
        }

        const deleteQuery =
          "DELETE FROM Medicamento_Categoria WHERE id_Medicamento = ?";
        connection.query(deleteQuery, [id], (delErr) => {
          if (delErr) {
            return connection.rollback(() => {
              console.error("Error deleting old categories:", delErr);
              res.status(500).json({ message: "Error updating categories." });
            });
          }

          if (newCategoryIds.length > 0) {
            const insertQuery =
              "INSERT INTO Medicamento_Categoria (id_Medicamento, id_Categoria) VALUES ?";
            const values = newCategoryIds.map((catId) => [id, catId]);

            connection.query(insertQuery, [values], (insErr) => {
              if (insErr) {
                return connection.rollback(() => {
                  console.error("Error inserting new categories:", insErr);
                  res
                    .status(500)
                    .json({ message: "Error assigning new categories." });
                });
              }

              connection.commit((commitErr) => {
                if (commitErr) {
                  return connection.rollback(() => {
                    console.error("Error committing transaction:", commitErr);
                    res.status(500).json({ message: "Error saving changes." });
                  });
                }
                res
                  .status(200)
                  .json({ message: "Medicamento updated successfully." });
              });
            });
          } else {
            connection.commit((commitErr) => {
              if (commitErr) {
                return connection.rollback(() =>
                  res.status(500).json({ message: "Error saving changes." })
                );
              }
              res
                .status(200)
                .json({ message: "Medicamento updated successfully." });
            });
          }
        });
      }
    );
  });
};

const createMedicamento = (req, res) => {
  const {
    Nombre,
    precio,
    Stock,
    Venta_libre,
    categorias: categoryIds,
  } = req.body;

  if (
    !Nombre ||
    precio === undefined ||
    Stock === undefined ||
    Venta_libre === undefined ||
    !Array.isArray(categoryIds)
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ message: "Error en el servidor." });
    }

    const medQuery =
      "INSERT INTO Medicamentos (Nombre, precio, Stock, Venta_libre) VALUES (?, ?, ?, ?)";
    connection.query(
      medQuery,
      [Nombre, precio, Stock, Venta_libre],
      (medErr, medResults) => {
        if (medErr) {
          return connection.rollback(() => {
            console.error("Error creating medication:", medErr);
            res.status(500).json({ message: "Error al crear el medicamento." });
          });
        }

        const newMedicamentoId = medResults.insertId;

        if (categoryIds.length > 0) {
          const insertQuery =
            "INSERT INTO Medicamento_Categoria (id_Medicamento, id_Categoria) VALUES ?";
          const values = categoryIds.map((catId) => [newMedicamentoId, catId]);

          connection.query(insertQuery, [values], (insErr) => {
            if (insErr) {
              return connection.rollback(() => {
                console.error("Error inserting categories:", insErr);
                res
                  .status(500)
                  .json({ message: "Error al asignar categorías." });
              });
            }

            connection.commit((commitErr) => {
              if (commitErr) {
                return connection.rollback(() =>
                  res.status(500).json({ message: "Error al guardar." })
                );
              }
              res.status(201).json({
                message: "Medicamento creado exitosamente.",
                id: newMedicamentoId,
              });
            });
          });
        } else {
          connection.commit((commitErr) => {
            if (commitErr) {
              return connection.rollback(() =>
                res.status(500).json({ message: "Error al guardar." })
              );
            }
            res.status(201).json({
              message: "Medicamento creado exitosamente.",
              id: newMedicamentoId,
            });
          });
        }
      }
    );
  });
};

const deleteMedicamento = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID de medicamento es requerido." });
  }

  const query = "DELETE FROM Medicamentos WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error deleting medication:", error);
      return res.status(500).json({
        message:
          "Error al eliminar el medicamento. Puede que esté asociado a ventas existentes.",
      });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Medicamento con ID ${id} no encontrado.` });
    }

    res.status(200).json({ message: "Medicamento eliminado exitosamente." });
  });
};

module.exports = {
  getMedicamentosConCategorias,
  getMedicamentoById,
  updateMedicamento,
  createMedicamento,
  deleteMedicamento,
};
