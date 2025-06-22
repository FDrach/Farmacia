const express = require("express");
const router = express.Router();
const { getVentasDetalladas, crearVenta } = require("../controllers/ventasController");

// Obtener ventas detalladas
router.get("/", getVentasDetalladas);

// Registrar una nueva venta
router.post("/", crearVenta);

module.exports = router;
