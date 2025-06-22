import useFiltroCategoriaStore from "../store/filtroCategoriaStore";
import { useProductos } from "../hooks/useProductos";
import useCarritoStore from "../store/carritoStore";

// The base URL for our backend server where the images are hosted
const IMAGES_BASE_URL = "http://localhost:8080/images/medicamentos";

export default function Productos() {
  const { productos, loading, error } = useProductos();
  const { categoriaSeleccionada } = useFiltroCategoriaStore();
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((prod) =>
        prod.categorias && prod.categorias.includes(categoriaSeleccionada)
      )
    : productos;

  return (
    <div className="productos-grid">
      {productosFiltrados.map((prod) => (
        <div key={prod.id} className="producto-card">
          <div className="producto-img-placeholder">
            {/* Replace the icon with an img tag */}
            <img
              src={`${IMAGES_BASE_URL}/${prod.id}.png`} // Construct the image URL
              alt={prod.Nombre}
              className="producto-img" // Add a class for styling
              // This is a fallback in case the image fails to load
              onError={(e) => {
                e.currentTarget.onerror = null; // prevents looping
                e.currentTarget.style.display = 'none'; // hide the broken image icon
                // Create and append a fallback icon if you want
                const fallbackIcon = document.createElement('i');
                fallbackIcon.className = 'fas fa-capsules fallback-icon';
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
      ))}
    </div>
  );
}