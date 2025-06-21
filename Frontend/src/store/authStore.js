import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ENDPOINTS } from "../config/endpoints";
import axios from "axios";

const useAuthStore = create(
  persist(
    (set) => ({
      // ESTADO
      usuario: null,
      cargando: false,
      error: null,

      // ACCIONES
      login: async (nombreUsuario, contrasena) => {
        set({ cargando: true, error: null });
        try {
          const response = await axios.post(ENDPOINTS.LOGIN, {
            usuario: nombreUsuario,
            contrasena: contrasena,
          });
          const data = response.data;

          // En un login exitoso, actualizamos el estado con los datos del usuario
          set({ usuario: data.usuario, cargando: false, error: null });
          return true; // Indicar éxito
        } catch (err) {
          let errorMessage = "Error de conexión o del servidor.";
          if (err.response && err.response.data && err.response.data.error) {
            // Use the specific error message from the backend API if available
            errorMessage = err.response.data.error;
          } else if (err.request) {
            // The request was made but no response was received
            errorMessage =
              "No se pudo conectar con el servidor. Por favor, intente más tarde.";
          } else {
            // Something else happened in setting up the request
            errorMessage = err.message;
          }

          console.error("Fallo el login:", errorMessage);
          set({ error: errorMessage, cargando: false, usuario: null });
          return false; // Indicar fallo
        }
      },

      logout: () => {
        // Limpia el estado del usuario y, por ende, el almacenamiento persistido
        set({ usuario: null, error: null });
      },
    }),
    {
      name: "auth-storage", // Nombre del item en el storage (debe ser único)
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
