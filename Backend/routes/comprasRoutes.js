const express = require("express");
const router = express.Router();
const {
  getComprasDetalladas,
  getCompraById,
  getComprasByProveedor,
  getComprasByUsuario,
} = require("../controllers/comprasController");

router.get("/", getComprasDetalladas);
router.get("/proveedor/:id_proveedor", getComprasByProveedor);
router.get("/usuario/:id_usuario", getComprasByUsuario);
router.get("/:id", getCompraById);

module.exports = router;
