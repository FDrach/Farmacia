import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useFiltroCategoriaStore from "../store/filtroCategoriaStore";
import { useProductos } from "../hooks/useProductos";
import useCarritoStore from "../store/carritoStore";

const IMAGES_BASE_URL = "http://localhost:8080/images/medicamentos";

export default function Productos() {
  const { productos, loading, error } = useProductos();
  const { categoriaSeleccionada } = useFiltroCategoriaStore();
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const productosFiltrados = useMemo(() => {
    let items = productos;

    if (categoriaSeleccionada) {
      items = items.filter(
        (prod) =>
          prod.categorias && prod.categorias.includes(categoriaSeleccionada)
      );
    }

    if (searchTerm) {
      const searchKeywords = searchTerm
        .toLowerCase()
        .split(" ")
        .filter((word) => word);
      items = items.filter((prod) => {
        const prodNombre = prod.Nombre.toLowerCase();
        return searchKeywords.every((keyword) => prodNombre.includes(keyword));
      });
    }

    return items;
  }, [productos, categoriaSeleccionada, searchTerm]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productos-grid">
      {productosFiltrados.length > 0 ? (
        productosFiltrados.map((prod) => (
          <div key={prod.id} className="producto-card">
            <div className="producto-img-placeholder">
              <img
                src={`${IMAGES_BASE_URL}/${prod.id}.png`}
                alt={prod.Nombre}
                className="producto-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = "none";
                  const fallbackIcon = document.createElement("i");
                  fallbackIcon.className = "fas fa-capsules fallback-icon";
                  e.currentTarget.parentElement.appendChild(fallbackIcon);
                }}
              />
            </div>
            <h3 className="producto-nombre">{prod.Nombre}</h3>
            <div className="producto-categorias">
              {prod.categorias && prod.categorias.length > 0
                ? prod.categorias.join(", ")
                : "Sin categoría"}
            </div>
            <div className="producto-precio">${prod.precio}</div>
            <button
              className="producto-btn"
              onClick={() => agregarProducto({ ...prod, cantidad: 1 })}
            >
              Añadir al carrito
            </button>
          </div>
        ))
      ) : (
        <p>No se encontraron productos que coincidan con los filtros.</p>
      )}
    </div>
  );
}