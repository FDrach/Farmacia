import { useState } from "react";
import useVentaStore from "../store/ventaStore";

export function usePago({ id_cliente, id_usuario, total, carrito, onPagar }) {
  const [metodo, setMetodo] = useState("");
  const [pago, setPago] = useState("");
  const [vuelto, setVuelto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [factura, setFactura] = useState(null);
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");

  const guardarVenta = useVentaStore((state) => state.guardarVenta);

  const handleMetodo = (m) => {
    setMetodo(m);
    setPago("");
    setVuelto(null);
  };

  const handlePagoChange = (e) => {
    const value = e.target.value.replace(",", ".");
    setPago(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= total) {
      setVuelto((num - total).toFixed(2));
    } else {
      setVuelto(null);
    }
  };

  const handleConfirmarPago = async (metodo_pago) => {
    setLoading(true);
    try {
      const ventaData = {
        id_cliente,
        id_usuario,
        total,
        metodo_pago,
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
        medicamentos_vendidos: carrito
      };
      const res = await guardarVenta(ventaData);
      setFactura(res);
      onPagar && onPagar(metodo_pago, pago, vuelto);

      if (metodo_pago === "tarjeta") {
        setNombreTarjeta("");
        setNumeroTarjeta("");
        setVencimiento("");
        setCvv("");
      }
    } catch (err) {
      alert("Error al registrar la venta");
    }
    setLoading(false);
  };

  return {
    metodo, setMetodo: handleMetodo,
    pago, setPago,
    vuelto, setVuelto,
    loading,
    factura, setFactura,
    nombreTarjeta, setNombreTarjeta,
    numeroTarjeta, setNumeroTarjeta,
    vencimiento, setVencimiento,
    cvv, setCvv,
    handlePagoChange,
    handleConfirmarPago
  };
}