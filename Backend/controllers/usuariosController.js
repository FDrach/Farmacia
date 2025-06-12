const { connection } = require("../config/db");

const getUsuarios = (req, res) => {
  const query =
    "SELECT id, dni, nombre, tipo, Horario, Sueldo, usuario FROM Usuarios ORDER BY nombre;";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Error fetching users." });
    }
    res.status(200).json(results);
  });
};

const getUsuarioById = (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT id, dni, nombre, tipo, Horario, Sueldo, usuario FROM Usuarios WHERE id = ?;";

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      return res.status(500).json({ message: "Error fetching user." });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }
    res.status(200).json(results[0]);
  });
};

const getUsuarioByDni = (req, res) => {
  const { dni } = req.params;
  const query =
    "SELECT id, dni, nombre, tipo, Horario, Sueldo, usuario FROM Usuarios WHERE dni = ?;";

  connection.query(query, [dni], (error, results) => {
    if (error) {
      console.error(`Error fetching user with DNI ${dni}:`, error);
      return res.status(500).json({ message: "Error fetching user." });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: `User with DNI ${dni} not found.` });
    }
    res.status(200).json(results[0]);
  });
};

const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, Horario, Sueldo, usuario, contrasena } = req.body;

  const fields = [];
  const values = [];

  if (nombre) {
    fields.push("nombre = ?");
    values.push(nombre);
  }
  if (tipo) {
    fields.push("tipo = ?");
    values.push(tipo);
  }
  if (Horario) {
    fields.push("Horario = ?");
    values.push(Horario);
  }
  if (Sueldo) {
    fields.push("Sueldo = ?");
    values.push(Sueldo);
  }
  if (usuario) {
    fields.push("usuario = ?");
    values.push(usuario);
  }
  if (contrasena) {
    fields.push("contrasena = ?");
    values.push(contrasena);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields to update provided." });
  }

  values.push(id);

  const query = `UPDATE Usuarios SET ${fields.join(", ")} WHERE id = ?;`;

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      return res.status(500).json({ message: "Error updating user." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }
    res
      .status(200)
      .json({ message: `User with ID ${id} updated successfully.` });
  });
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  getUsuarioByDni,
  updateUsuario,
};
