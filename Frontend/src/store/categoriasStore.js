import { create } from "zustand";
import axios from "axios";

const useCategoriasStore = create((set) => ({
  categorias: [],
  cargando: false,
  error: null,
  fetchCategorias: async () => {
    set({ cargando: true, error: null });
    try {
      const res = await axios.get("http://localhost:8080/api/categorias");
      set({ categorias: res.data, cargando: false });
    } catch (err) {
      set({
        error: "No se pudieron cargar las categorías.",
        cargando: false,
      });
    }
  },
}));

export default useCategoriasStore;