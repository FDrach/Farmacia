const express = require("express");
const router = express.Router();
const { createCompra } = require("../controllers/comprasAdminController");

router.post("/create", createCompra);

module.exports = router;
