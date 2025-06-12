const express = require("express");
const router = express.Router();
const { getVentasDetalladas } = require("../controllers/ventasController");

router.get("/", getVentasDetalladas);

module.exports = router;
