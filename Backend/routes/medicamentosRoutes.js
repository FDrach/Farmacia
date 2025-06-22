const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getMedicamentosConCategorias,
  getMedicamentoById,
  updateMedicamento,
  createMedicamento,
  deleteMedicamento,
} = require("../controllers/medicamentosController");

router.get("/", getMedicamentosConCategorias);
router.post("/create", createMedicamento);

router.post("/:id/upload-image", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ message: "No se ha seleccionado ningún archivo." });
  }

  const uploadedFile = req.files.medicamentoImage;
  const medId = req.params.id;

  const uploadPath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "medicamentos",
    `${medId}.png`
  );

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      return res.status(500).json({ message: "Error al guardar la imagen." });
    }

    res.status(200).json({
      message: "Imagen subida exitosamente.",
      filePath: `/images/medicamentos/${medId}.png`,
    });
  });
});

router
  .route("/:id")
  .get(getMedicamentoById)
  .put(updateMedicamento)
  .delete(deleteMedicamento);

module.exports = router;
