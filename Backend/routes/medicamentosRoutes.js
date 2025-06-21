const express = require("express");
const router = express.Router();
const {
  getMedicamentosConCategorias,
} = require("../controllers/medicamentosController");

router.get("/", getMedicamentosConCategorias);
router.get("/:id", getMedicamentoById);


module.exports = router;
