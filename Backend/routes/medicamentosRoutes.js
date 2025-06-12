const express = require("express");
const router = express.Router();
const {
  getMedicamentosConCategorias,
} = require("../controllers/medicamentosController");

router.get("/", getMedicamentosConCategorias);

module.exports = router;
