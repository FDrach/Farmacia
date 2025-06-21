const express = require("express");
const router = express.Router();
const {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} = require("../controllers/clientesController");

router.get("/", getClientes);
router.post("/create", createCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

module.exports = router;
