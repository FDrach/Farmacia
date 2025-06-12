const express = require("express");
const router = express.Router();
const {
  getUsuarios,
  getUsuarioById,
  getUsuarioByDni,
  updateUsuario,
} = require("../controllers/usuariosController");

router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.get("/dni/:dni", getUsuarioByDni);
router.put("/:id", updateUsuario);

module.exports = router;
