import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ENDPOINTS } from "../config/endpoints";

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
          const response = await fetch(ENDPOINTS.LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario: nombreUsuario, contrasena }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Usuario o contraseña incorrectos");
          }

          // En un login exitoso, actualizamos el estado con los datos del usuario
          set({ usuario: data.usuario, cargando: false, error: null });
          return true; // Indicar éxito
        } catch (err) {
          console.error("Fallo el login:", err.message);
          set({ error: err.message, cargando: false, usuario: null });
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
