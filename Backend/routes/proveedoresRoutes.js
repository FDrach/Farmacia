const express = require("express");
const router = express.Router();
const {
  getProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
  getProveedoresConMedicamentos,
} = require("../controllers/proveedoresController");

router.get("/", getProveedores);
router.post("/create", createProveedor);
router.put("/:id", updateProveedor);
router.delete("/:id", deleteProveedor);
router.get("/con-medicamentos", getProveedoresConMedicamentos);

module.exports = router;
