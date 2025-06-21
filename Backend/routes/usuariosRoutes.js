const express = require("express");
const router = express.Router();
const {
  getUsuarios,
  getUsuarioById,
  getUsuarioByDni,
  updateUsuario,
  createUsuario,
  deleteUsuario,
} = require("../controllers/usuariosController");

router.get("/", getUsuarios);
router.post("/create", createUsuario);
router.get("/dni/:dni", getUsuarioByDni);

router
  .route("/:id")
  .get(getUsuarioById)
  .put(updateUsuario)
  .delete(deleteUsuario);

module.exports = router;
