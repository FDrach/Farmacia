const { connection } = require("../config/db");

const getCategorias = (req, res) => {
  const query = "SELECT * FROM Categorias ORDER BY nombre;";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ message: "Error fetching categories." });
    }
    res.status(200).json(results);
  });
};

module.exports = { getCategorias };
