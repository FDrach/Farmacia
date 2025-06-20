import { useProductos } from "../hooks/useProductos";

export default function Productos() {
  const { productos, loading, error } = useProductos();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productos-grid">
      {productos.map((prod) => (
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
          <button className="producto-btn">Añadir al carrito</button>
        </div>
      ))}
    </div>
  );
}