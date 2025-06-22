import create from "zustand";
import axios from "axios";

const useVentaStore = create((set) => ({
  venta: null,
  setVenta: (venta) => set({ venta }),
  guardarVenta: async (venta) => {
    try {
      const response = await axios.post("http://localhost:8080/api/ventas", venta);
      set({ venta: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}));

export default useVentaStore;