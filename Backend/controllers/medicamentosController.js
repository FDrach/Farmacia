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

module.exports = {
  getMedicamentosConCategorias,
  getMedicamentoById,
};
