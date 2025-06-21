const { connection } = require("../config/db");

const getClientes = (req, res) => {
  const query = `
        SELECT c.id, c.Nombre, c.dni, c.id_obra_social, os.nombre as obra_social_nombre
        FROM Clientes c
        JOIN obra_social os ON c.id_obra_social = os.id
        ORDER BY c.Nombre;
    `;
  connection.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener los clientes." });
    }
    res.status(200).json(results);
  });
};

const createCliente = (req, res) => {
  const { Nombre, dni, id_obra_social } = req.body;
  if (!Nombre || !dni || !id_obra_social) {
    return res
      .status(400)
      .json({ message: "Nombre, DNI y obra social son requeridos." });
  }
  const query =
    "INSERT INTO Clientes (Nombre, dni, id_obra_social) VALUES (?, ?, ?)";
  connection.query(query, [Nombre, dni, id_obra_social], (error, results) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: `El cliente con DNI ${dni} ya existe.` });
      }
      return res.status(500).json({ message: "Error al crear el cliente." });
    }
    res
      .status(201)
      .json({ message: "Cliente creado exitosamente.", id: results.insertId });
  });
};

const updateCliente = (req, res) => {
  const { id } = req.params;
  const { Nombre, dni, id_obra_social } = req.body;
  if (!Nombre || !dni || !id_obra_social) {
    return res
      .status(400)
      .json({ message: "Nombre, DNI y obra social son requeridos." });
  }
  const query =
    "UPDATE Clientes SET Nombre = ?, dni = ?, id_obra_social = ? WHERE id = ?";
  connection.query(
    query,
    [Nombre, dni, id_obra_social, id],
    (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            message: `El DNI ${dni} ya está en uso por otro cliente.`,
          });
        }
        return res
          .status(500)
          .json({ message: "Error al actualizar el cliente." });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: `Cliente con ID ${id} no encontrado.` });
      }
      res.status(200).json({ message: "Cliente actualizado exitosamente." });
    }
  );
};

const deleteCliente = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Clientes WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
          message:
            "No se puede eliminar el cliente porque tiene ventas o recetas asociadas.",
        });
      }
      return res.status(500).json({ message: "Error al eliminar el cliente." });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Cliente con ID ${id} no encontrado.` });
    }
    res.status(200).json({ message: "Cliente eliminado exitosamente." });
  });
};

module.exports = { getClientes, createCliente, updateCliente, deleteCliente };
