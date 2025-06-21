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
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required." });
  }

  const query = `
        call get_medicamentos_by_id(?);
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

module.exports = {
  getMedicamentosConCategorias,
  getMedicamentoById,
};
