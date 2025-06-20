import React from "react";

export default function ModalLogin({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-login">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Iniciar sesión</h2>
        <form className="modal-login-form">
          <label>
            Usuario o correo
            <input type="text" placeholder="Ingresa tu usuario" />
          </label>
          <label>
            Contraseña
            <input type="password" placeholder="Contraseña" />
          </label>
          <button type="submit" className="modal-login-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}