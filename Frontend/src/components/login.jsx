import React, { useState } from "react";

export default function Login({ open, onClose }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
      } else {
        // Guarda el usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        onClose();
      }
    } catch (err) {
      setError("Error de conexión");
    }
    setLoading(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-login">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Iniciar sesión</h2>
        <form className="modal-login-form" onSubmit={handleSubmit}>
          <label>
            Usuario o correo
            <input
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
              placeholder="Contraseña"
              required
            />
            {/* Mensaje de error debajo del input de contraseña */}
            {error && (
              <div style={{ color: "red", marginTop: "0.3rem", fontSize: "0.95rem" }}>
                {error}
              </div>
            )}
          </label>
          <button type="submit" className="modal-login-btn" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}