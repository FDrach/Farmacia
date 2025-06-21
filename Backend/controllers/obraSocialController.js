const { connection } = require("../config/db");

const getObrasSociales = (req, res) => {
  const query = "SELECT * FROM obra_social ORDER BY nombre";
  connection.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener las obras sociales." });
    }
    res.status(200).json(results);
  });
};

const createObraSocial = (req, res) => {
  const { nombre, descuento } = req.body;
  if (!nombre || descuento === undefined) {
    return res
      .status(400)
      .json({ message: "Nombre y descuento son requeridos." });
  }
  const query = "INSERT INTO obra_social (nombre, descuento) VALUES (?, ?)";
  connection.query(query, [nombre, descuento], (error, results) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "Ya existe una obra social con ese nombre." });
      }
      return res
        .status(500)
        .json({ message: "Error al crear la obra social." });
    }
    res
      .status(201)
      .json({
        message: "Obra social creada exitosamente.",
        id: results.insertId,
      });
  });
};

module.exports = { getObrasSociales, createObraSocial };
