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

const createCategoria = (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "El nombre es requerido." });
  }
  const query = "INSERT INTO Categorias (nombre) VALUES (?)";
  connection.query(query, [nombre], (error, results) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "Ya existe una categoría con ese nombre." });
      }
      console.error("Error creating category:", error);
      return res.status(500).json({ message: "Error al crear la categoría." });
    }
    res.status(201).json({
      message: "Categoría creada exitosamente.",
      id: results.insertId,
    });
  });
};

const updateCategoria = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "El nombre es requerido." });
  }
  const query = "UPDATE Categorias SET nombre = ? WHERE id = ?";
  connection.query(query, [nombre, id], (error, results) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "Ya existe una categoría con ese nombre." });
      }
      console.error("Error updating category:", error);
      return res
        .status(500)
        .json({ message: "Error al actualizar la categoría." });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Categoría con ID ${id} no encontrada.` });
    }
    res.status(200).json({ message: "Categoría actualizada exitosamente." });
  });
};

const deleteCategoria = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Categorias WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
          message:
            "No se puede eliminar la categoría porque está asignada a uno o más medicamentos.",
        });
      }
      console.error("Error deleting category:", error);
      return res
        .status(500)
        .json({ message: "Error al eliminar la categoría." });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Categoría con ID ${id} no encontrada.` });
    }
    res.status(200).json({ message: "Categoría eliminada exitosamente." });
  });
};

module.exports = {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
