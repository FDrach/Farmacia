import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export function useComprasAdmin() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [proveedoresPorMed, setProveedoresPorMed] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [medsRes, provsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/medicamentos`),
        axios.get(`${API_BASE_URL}/proveedores/con-medicamentos`),
      ]);

      setMedicamentos(medsRes.data);

      const provsByMedId = {};
      provsRes.data.forEach((provider) => {
        provider.medicamentos.forEach((medProv) => {
          const medBaseId = medProv.id_medicamento_base;
          if (!provsByMedId[medBaseId]) {
            provsByMedId[medBaseId] = [];
          }
          provsByMedId[medBaseId].push({
            id_medicamento_prov: medProv.id,
            proveedor_nombre: provider.nombre,
            ...medProv,
          });
        });
      });
      setProveedoresPorMed(provsByMedId);
    } catch (err) {
      setError("No se pudieron cargar los datos para comprar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const realizarCompra = async (compraData) => {
    try {
      await axios.post(`${API_BASE_URL}/compras-admin/create`, compraData);
      await fetchData();
    } catch (err) {
      console.error("Error al realizar la compra:", err);
      throw new Error(
        err.response?.data?.message || "Error al procesar la compra."
      );
    }
  };

  return { medicamentos, proveedoresPorMed, loading, error, realizarCompra };
}
