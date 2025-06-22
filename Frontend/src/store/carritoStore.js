import { create } from "zustand";

const useCarritoStore = create((set) => ({
  carrito: [],
  agregarProducto: (producto) =>
    set((state) => {
      // Si el producto ya está en el carrito, suma la cantidad
      const index = state.carrito.findIndex((p) => p.id === producto.id);
      if (index !== -1) {
        const nuevoCarrito = [...state.carrito];
        nuevoCarrito[index].cantidad += producto.cantidad || 1;
        return { carrito: nuevoCarrito };
      }
      return { carrito: [...state.carrito, { ...producto, cantidad: producto.cantidad || 1 }] };
    }),
  quitarProducto: (id) =>
    set((state) => ({
      carrito: state.carrito.filter((p) => p.id !== id),
    })),
  vaciarCarrito: () => set({ carrito: [] }),
}));

export default useCarritoStore;