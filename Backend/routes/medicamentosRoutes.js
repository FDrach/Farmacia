const express = require("express");
const router = express.Router();
const {
  getMedicamentosConCategorias,
  getMedicamentoById,
} = require("../controllers/medicamentosController");

router.get("/", getMedicamentosConCategorias);
router.get("/:id", getMedicamentoById);


module.exports = router;
