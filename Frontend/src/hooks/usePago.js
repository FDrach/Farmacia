import { useState } from "react";
import useVentaStore from "../store/ventaStore";
import useAuthStore from "../store/authStore";

export function usePago({ id_cliente, total, carrito, onPagar, obrasSociales }) {
  const [metodo, setMetodo] = useState("");
  const [pago, setPago] = useState("");
  const [vuelto, setVuelto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [factura, setFactura] = useState(null);
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [obraSocial, setObraSocial] = useState("");

  const guardarVenta = useVentaStore((state) => state.guardarVenta);
  const { usuario } = useAuthStore.getState();

  const handleMetodo = (m) => {
    setMetodo(m);
    setPago("");
    setVuelto(null);
  };

  const handlePagoChange = (e) => {
    const value = e.target.value.replace(",", ".");
    setPago(value);
    const os = obrasSociales?.find((os) => os.nombre === obraSocial);
    let totalConDescuento = total;
    if (os && os.descuento) {
      totalConDescuento = total * (1 - os.descuento / 100);
    }
    const num = parseFloat(value);
    if (!isNaN(num) && num >= totalConDescuento) {
      setVuelto((num - totalConDescuento).toFixed(2));
    } else {
      setVuelto(null);
    }
  };

  const handleConfirmarPago = async (metodo_pago) => {
    setLoading(true);
    if (!usuario || !usuario.id) {
      alert(
        "Error: La sesión del usuario ha expirado. Por favor, inicie sesión de nuevo."
      );
      setLoading(false);
      return;
    }

    // Aplica descuento según la obra social seleccionada
    let totalConDescuento = total;
    const os = obrasSociales?.find((os) => os.nombre === obraSocial);
    if (os && os.descuento) {
      totalConDescuento = total * (1 - os.descuento / 100);
    }

    try {
      const ventaData = {
        id_cliente,
        id_usuario: usuario.id,
        total: totalConDescuento,
        metodo_pago,
        fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
        medicamentos_vendidos: carrito,
        obra_social: obraSocial,
      };
      const res = await guardarVenta(ventaData);
      setFactura(res);
      onPagar && onPagar(metodo_pago, pago, vuelto);

      // Limpia campos de tarjeta
      if (metodo_pago === "tarjeta") {
        setNombreTarjeta("");
        setNumeroTarjeta("");
        setVencimiento("");
        setCvv("");
        setObraSocial("");
      }
    } catch (err) {
      alert("Error al registrar la venta");
    }
    setLoading(false);
  };

  return {
    metodo,
    setMetodo,
    pago,
    setPago,
    vuelto,
    setVuelto,
    loading,
    factura,
    setFactura,
    nombreTarjeta,
    setNombreTarjeta,
    numeroTarjeta,
    setNumeroTarjeta,
    vencimiento,
    setVencimiento,
    cvv,
    setCvv,
    obraSocial,
    setObraSocial,
    handlePagoChange,
    handleConfirmarPago,
  };
}
