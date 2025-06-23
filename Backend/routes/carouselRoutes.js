const express = require("express");
const router = express.Router();
const {
  getCarouselImages,
  uploadCarouselImage,
  deleteCarouselImage,
} = require("../controllers/carouselController");

router.get("/", getCarouselImages);
router.post("/upload", uploadCarouselImage);
router.delete("/delete", deleteCarouselImage);

module.exports = router;
