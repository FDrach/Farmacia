import { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export default function Carrusel() {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/carousel-images`);

        const fullImageUrls = response.data.map(
          (relativePath) => `http://localhost:8080${relativePath}`
        );
        setImagenes(fullImageUrls);
      } catch (error) {
        console.error("Failed to fetch carousel images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  if (loading) {
    return (
      <div
        className="custom-carousel-container"
        style={{ minHeight: "400px", background: "#f3f3f3" }}
      ></div>
    );
  }

  if (imagenes.length === 0) {
    return null;
  }

  return (
    <div className="custom-carousel-container">
      <Slider {...settings}>
        {imagenes.map((src, idx) => (
          <div key={idx} className="carousel-slide">
            <img
              src={src}
              alt={`banner-${idx}`}
              className="carousel-img"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
