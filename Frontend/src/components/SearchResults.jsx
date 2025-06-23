import { useState } from "react";
import { Link } from "react-router-dom";

const IMAGES_BASE_URL = "http://localhost:8080/images/medicamentos";

function ImageWithFallback({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="search-result-img-fallback">
        <i className="fas fa-capsules"></i>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="search-result-img"
      onError={() => setHasError(true)}
    />
  );
}

export default function SearchResults({ results, onResultClick }) {
  if (results.length === 0) {
    return (
      <div className="search-results-dropdown">
        <div className="search-result-item">
          <span>No se encontraron resultados.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-dropdown">
      {results.slice(0, 7).map((med) => (
        <Link
          to={`/Productos?search=${encodeURIComponent(med.Nombre)}`}
          key={med.id}
          className="search-result-item"
          onClick={onResultClick}
        >
          <ImageWithFallback
            src={`${IMAGES_BASE_URL}/${med.id}.png`}
            alt={med.Nombre}
          />
          <div className="search-result-info">
            <span className="search-result-name">{med.Nombre}</span>
            <span className="search-result-price">${med.precio}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
