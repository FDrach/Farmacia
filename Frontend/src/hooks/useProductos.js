import { useEffect, useState } from "react";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/medicamentos")
      .then(res => {
        if (!res.ok) throw new Error("Error HTTP: " + res.status);
        return res.json();
      })
      .then(data => {
        setProductos(Array.isArray(data) ? data : data.productos || []);
        setLoading(false);
      })
      .catch(err => {
        setError("Error al cargar productos: " + err.message);
        setLoading(false);
      });
  }, []);

  return { productos, loading, error };
}