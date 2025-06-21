const express = require("express");
const router = express.Router();
const {
  getMedicamentosByProveedor,
  addMedicamentoToProveedor,
  updateMedicamentoProveedor,
  removeMedicamentoFromProveedor,
} = require("../controllers/medicamentosProvController");

router.get("/proveedor/:id_proveedor", getMedicamentosByProveedor);
router.post("/create", addMedicamentoToProveedor);
router.put("/:id", updateMedicamentoProveedor);
router.delete("/:id", removeMedicamentoFromProveedor);

module.exports = router;
