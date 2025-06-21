const express = require("express");
const router = express.Router();
const {
  getObrasSociales,
  createObraSocial,
} = require("../controllers/obraSocialController");

router.get("/", getObrasSociales);
router.post("/create", createObraSocial);

module.exports = router;
