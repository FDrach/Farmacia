import { useState } from "react";
import useAuthStore from "../store/authStore";

export default function Login({ open, onClose }) {
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Obtener estado y acciones del store de Zustand
  const { login, cargando, error } = useAuthStore();

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(nombreDeUsuario, contrasena);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-login">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Iniciar sesión</h2>
        <form className="modal-login-form" onSubmit={handleSubmit}>
          <label>
            Usuario o correo
            <input
              type="text"
              value={nombreDeUsuario}
              onChange={(e) => setNombreDeUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Contraseña"
              required
            />
            {/* Mostrar mensaje de error del store */}
            {error && (
              <div
                style={{
                  color: "red",
                  marginTop: "0.3rem",
                  fontSize: "0.95rem",
                }}
              >
                {error}
              </div>
            )}
          </label>
          <button type="submit" className="modal-login-btn" disabled={cargando}>
            {cargando ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
