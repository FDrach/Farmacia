const fs = require("fs");
const path = require("path");

const CAROUSEL_DIR = path.join(__dirname, "..", "public", "images", "carousel");

const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const getCarouselImages = (req, res) => {
  ensureDirExists(CAROUSEL_DIR);
  fs.readdir(CAROUSEL_DIR, (err, files) => {
    if (err) {
      console.error("Could not list the directory.", err);
      return res
        .status(500)
        .json({ message: "Error getting carousel images." });
    }
    const imageFiles = files.filter((file) =>
      /\.(png|jpe?g|gif|webp)$/i.test(file)
    );
    const imageUrls = imageFiles.map((file) => `/images/carousel/${file}`);
    res.status(200).json(imageUrls);
  });
};

const uploadCarouselImage = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ message: "No se ha seleccionado ningún archivo." });
  }

  const uploadedFile = req.files.carouselImage;

  const fileName = path.basename(uploadedFile.name);
  const uploadPath = path.join(CAROUSEL_DIR, fileName);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      return res.status(500).json({ message: "Error al guardar la imagen." });
    }
    res
      .status(201)
      .json({
        message: "Imagen subida exitosamente.",
        filePath: `/images/carousel/${fileName}`,
      });
  });
};

const deleteCarouselImage = (req, res) => {
  const { filename } = req.body;
  if (!filename) {
    return res
      .status(400)
      .json({ message: "Se requiere el nombre del archivo." });
  }

  const baseFilename = path.basename(filename);
  const filePath = path.join(CAROUSEL_DIR, baseFilename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist:", filePath);
      return res.status(404).json({ message: "El archivo no existe." });
    }

    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting file:", unlinkErr);
        return res
          .status(500)
          .json({ message: "Error al eliminar la imagen." });
      }
      res.status(200).json({ message: "Imagen eliminada exitosamente." });
    });
  });
};

module.exports = {
  getCarouselImages,
  uploadCarouselImage,
  deleteCarouselImage,
};
