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

const createUsuario = (req, res) => {
  const { dni, nombre, tipo, Horario, Sueldo, usuario, contrasena } = req.body;

  if (
    !dni ||
    !nombre ||
    !tipo ||
    !Horario ||
    !Sueldo ||
    !usuario ||
    !contrasena
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const checkQuery = "SELECT * FROM Usuarios WHERE dni = ? OR usuario = ?";
  connection.query(checkQuery, [dni, usuario], (checkError, checkResults) => {
    if (checkError) {
      console.error("Error checking for existing user:", checkError);
      return res.status(500).json({ message: "Error creating user." });
    }

    if (checkResults.length > 0) {
      const existingUser = checkResults[0];
      if (existingUser.dni === dni) {
        return res
          .status(409)
          .json({ message: `A user with DNI ${dni} already exists.` });
      }
      if (existingUser.usuario === usuario) {
        return res.status(409).json({
          message: `A user with username '${usuario}' already exists.`,
        });
      }
    }

    const insertQuery =
      "INSERT INTO Usuarios (dni, nombre, tipo, Horario, Sueldo, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [dni, nombre, tipo, Horario, Sueldo, usuario, contrasena];

    connection.query(insertQuery, values, (insertError, insertResults) => {
      if (insertError) {
        console.error("Error creating new user:", insertError);
        return res.status(500).json({ message: "Error creating user." });
      }
      res.status(201).json({
        message: "User created successfully.",
        userId: insertResults.insertId,
      });
    });
  });
};

const deleteUsuario = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Usuarios WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Error al eliminar el usuario." });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Usuario con ID ${id} no encontrado.` });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  });
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  getUsuarioByDni,
  updateUsuario,
  createUsuario,
  deleteUsuario,
};
