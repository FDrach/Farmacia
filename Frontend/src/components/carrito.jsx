import useCarritoStore from "../store/carritoStore";

export default function Carrito() {
  const { carrito, quitarProducto, vaciarCarrito } = useCarritoStore();

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  return (
    <div className="carrito-page">
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.map((prod) => (
              <li key={prod.id}>
                {prod.Nombre} x{prod.cantidad} - ${prod.precio * prod.cantidad}
                <button onClick={() => quitarProducto(prod.id)}>Quitar</button>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
          <button
            style={{ marginLeft: "1rem" }}
            onClick={() => alert("¡Gracias por tu compra!")}
          >
            Pagar
          </button>
        </>
      )}
    </div>
  );
}
