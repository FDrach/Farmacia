const { connection } = require("../config/db");

const loginUsuario = (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son requeridos." });
  }

  const query =
    "SELECT id, nombre, tipo, usuario, contrasena FROM Usuarios WHERE usuario = ?";

  connection.query(query, [usuario], (error, results) => {
    if (error) {
      console.error("Error de base de datos durante el login:", error);
      return res.status(500).json({ error: "Error en el servidor." });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    const usuarioEncontrado = results[0];

    if (contrasena !== usuarioEncontrado.contrasena) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    const { contrasena: _, ...usuarioParaEnviar } = usuarioEncontrado;

    res.status(200).json({
      message: "Login exitoso",
      usuario: usuarioParaEnviar,
    });
  });
};

module.exports = {
  loginUsuario,
};
