const express = require("express");
const router = express.Router();
const {
  getUsuarios,
  getUsuarioById,
  getUsuarioByDni,
  updateUsuario,
  createUsuario,
} = require("../controllers/usuariosController");

router.get("/", getUsuarios);
router.post("/create", createUsuario);
router.get("/:id", getUsuarioById);
router.get("/dni/:dni", getUsuarioByDni);
router.put("/:id", updateUsuario);

module.exports = router;
