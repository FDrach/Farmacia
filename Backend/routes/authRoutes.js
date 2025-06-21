const express = require("express");
const router = express.Router();
const { connection } = require("../config/db");

router.post("/login", (req, res) => {
  const { usuario, contrasena } = req.body;
  if (!usuario || !contrasena) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  const query = "SELECT id, nombre, tipo, usuario FROM Usuarios WHERE usuario = ? AND contrasena = ?";
  connection.query(query, [usuario, contrasena], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error en el servidor" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }
    res.json({ usuario: results[0] });
  });
});

module.exports = router;