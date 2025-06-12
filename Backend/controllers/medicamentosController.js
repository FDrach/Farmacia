const { connection } = require("../config/db");

const getMedicamentosConCategorias = (req, res) => {
  const query = `
        SELECT
            m.id,
            m.Nombre,
            m.precio,
            m.Stock,
            m.Venta_libre,
            COALESCE(JSON_ARRAYAGG(c.nombre), '[]') AS categorias
        FROM
            Medicamentos m
        LEFT JOIN
            Medicamento_Categoria mc ON m.id = mc.id_Medicamento
        LEFT JOIN
            Categorias c ON mc.id_Categoria = c.id
        GROUP BY
            m.id
        ORDER BY
            m.Nombre;
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
};
