import { useState } from "react";
import Notificacion from "../components/Notificacion";

export default function MedicamentosAdmin() {
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "" });

  const editarMedicamento = async (datos) => {
    // ...tu lógica para editar el medicamento...
    // Si la edición fue exitosa:
    setNotificacion({ visible: true, mensaje: "Artículo actualizado con éxito" });
    setTimeout(() => setNotificacion({ visible: false, mensaje: "" }), 2000);
  };

  return (
    <div>
      {/* ...tu código de la lista y edición... */}
      <Notificacion mensaje={notificacion.mensaje} visible={notificacion.visible} />
      {/* ...resto del código... */}
    </div>
  );
}