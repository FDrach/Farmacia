import Slider from "react-slick";

export default function Carrusel() {
  const imagenes = [
    "https://farmaciasplazoleta.com/wp-content/uploads/2025/06/BANNER-NUTRILON-1-1400x481.png",
    "https://farmaciasplazoleta.com/wp-content/uploads/2025/06/BANNER-FORTISIP-1-1400x525.png",
    "https://farmaciasplazoleta.com/wp-content/uploads/2025/06/BANNER-VITAL-1-1400x506.png",
  ];

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
