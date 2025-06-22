import React from "react";

export default function Notificacion({ mensaje, visible }) {
  return (
    <div className={`notificacion-carrito${visible ? " visible" : ""}`}>
      {mensaje}
    </div>
  );
}