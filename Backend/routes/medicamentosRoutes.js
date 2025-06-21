const express = require("express");
const router = express.Router();
const {
  getMedicamentosConCategorias,
  getMedicamentoById,
  updateMedicamento,
} = require("../controllers/medicamentosController");

router.get("/", getMedicamentosConCategorias);
router.get("/:id", getMedicamentoById);
router.put("/:id", updateMedicamento);

module.exports = router;
