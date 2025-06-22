import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export function useProveedoresAdmin() {
  const [proveedores, setProveedores] = useState([]);
  const [medicamentosBase, setMedicamentosBase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [provRes, medRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/proveedores`),
        axios.get(`${API_BASE_URL}/medicamentos`),
      ]);
      setProveedores(provRes.data);
      setMedicamentosBase(medRes.data);
    } catch (err) {
      setError("No se pudieron cargar los datos de proveedores.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getProveedoresConMedicamentos = async () => {
    setLoading(true);
    try {
      const provRes = await axios.get(`${API_BASE_URL}/proveedores`);
      const allProveedores = provRes.data;

      const detailedProveedores = await Promise.all(
        allProveedores.map(async (proveedor) => {
          const medsRes = await axios.get(
            `${API_BASE_URL}/medicamentos-prov/proveedor/${proveedor.id}`
          );
          return {
            ...proveedor,
            medicamentos: medsRes.data,
          };
        })
      );
      return detailedProveedores;
    } catch (err) {
      console.error("Error fetching detailed provider data for printing:", err);
      setError("Error al preparar los datos para imprimir.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addProveedor = async (data) => {
    try {
      await axios.post(`${API_BASE_URL}/proveedores/create`, data);
      await fetchData();
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Error al crear proveedor."
      );
    }
  };

  const updateProveedor = async (id, data) => {
    try {
      await axios.put(`${API_BASE_URL}/proveedores/${id}`, data);
      await fetchData();
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Error al actualizar proveedor."
      );
    }
  };

  const removeProveedor = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/proveedores/${id}`);
      await fetchData();
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Error al eliminar proveedor."
      );
    }
  };

  const getMedsByProvider = async (providerId) => {
    const response = await axios.get(
      `${API_BASE_URL}/medicamentos-prov/proveedor/${providerId}`
    );
    return response.data;
  };

  const addMedToProvider = async (data) => {
    await axios.post(`${API_BASE_URL}/medicamentos-prov/create`, data);
  };

  const updateMedFromProvider = async (medProvId, data) => {
    await axios.put(`${API_BASE_URL}/medicamentos-prov/${medProvId}`, data);
  };

  const removeMedFromProvider = async (medProvId) => {
    await axios.delete(`${API_BASE_URL}/medicamentos-prov/${medProvId}`);
  };

  return {
    proveedores,
    medicamentosBase,
    loading,
    error,
    addProveedor,
    updateProveedor,
    removeProveedor,
    getMedsByProvider,
    addMedToProvider,
    updateMedFromProvider,
    removeMedFromProvider,
    getProveedoresConMedicamentos,
  };
}
