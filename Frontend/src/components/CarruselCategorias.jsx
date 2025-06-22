import { useEffect, useState } from "react";
import useCategoriasStore from "../store/categoriasStore";
import useFiltroCategoriaStore from "../store/filtroCategoriaStore";
import { useNavigate } from "react-router-dom";

export default function CarruselCategorias() {
  const { categorias, cargando, error, fetchCategorias } = useCategoriasStore();
  const [start, setStart] = useState(0);
  const visible = 5;
  const setCategoria = useFiltroCategoriaStore((state) => state.setCategoria);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  if (cargando) return <div style={{ textAlign: "center" }}>Cargando categorías...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  if (!categorias.length) return null;

  // Calcula los índices para mostrar las categorías de forma circular
  const getVisibleCategorias = () => {
    if (categorias.length <= visible) return categorias;
    let result = [];
    for (let i = 0; i < visible; i++) {
      result.push(categorias[(start + i) % categorias.length]);
    }
    return result;
  };

  const handlePrev = () => {
    setStart((s) =>
      s === 0 ? categorias.length - visible : (s - 1 + categorias.length) % categorias.length
    );
  };

  const handleNext = () => {
    setStart((s) => (s + 1) % categorias.length);
  };

  // --- AQUI VIENE LA FUNCIONALIDAD ---
  const handleCategoriaClick = (cat) => {
    setCategoria(cat.nombre);
    navigate("/Productos");
  };

  return (
    <div className="carrusel-categorias-container">
      <h2 className="carrusel-categorias-titulo">CATEGORÍAS</h2>
      <div className="carrusel-categorias-flex">
        <button onClick={handlePrev} className="carrusel-categorias-btn">
          &#8592;
        </button>
        <div className="carrusel-categorias-lista">
          {getVisibleCategorias().map((cat) => (
            <div
              key={cat.id}
              className="carrusel-categorias-card"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoriaClick(cat)}
            >
              <div className="carrusel-categorias-img">
                <i className="fas fa-box-open" style={{ fontSize: "3rem", color: "#38b24a" }}></i>
              </div>
              <div className="carrusel-categorias-nombre">
                {cat.nombre?.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="carrusel-categorias-btn">
          &#8594;
        </button>
      </div>
    </div>
  );
}