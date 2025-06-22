import useFiltroCategoriaStore from "../store/filtroCategoriaStore";
import { useProductos } from "../hooks/useProductos";
import useCarritoStore from "../store/carritoStore";

export default function Productos() {
  const { productos, loading, error } = useProductos();
  const { categoriaSeleccionada } = useFiltroCategoriaStore();
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  // Filtrado por categoría
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
            <i
              className="fas fa-capsules"
              style={{ fontSize: "2.5rem", color: "#38b24a" }}
            ></i>
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
