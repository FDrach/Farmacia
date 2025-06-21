const express = require("express");
const router = express.Router();
const {
  getMedicamentosConCategorias,
  getMedicamentoById,
  updateMedicamento,
  createMedicamento,
  deleteMedicamento,
} = require("../controllers/medicamentosController");

router.get("/", getMedicamentosConCategorias);
router.post("/create", createMedicamento);

router
  .route("/:id")
  .get(getMedicamentoById)
  .put(updateMedicamento)
  .delete(deleteMedicamento);

module.exports = router;
