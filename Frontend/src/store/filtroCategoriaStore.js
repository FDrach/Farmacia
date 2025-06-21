import { create } from "zustand";

const useFiltroCategoriaStore = create((set) => ({
  categoriaSeleccionada: null,
  setCategoria: (categoria) => set({ categoriaSeleccionada: categoria }),
}));

export default useFiltroCategoriaStore;