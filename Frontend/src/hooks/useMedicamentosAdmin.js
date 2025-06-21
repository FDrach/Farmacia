import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export function useMedicamentosAdmin() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [medicamentosRes, categoriasRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/medicamentos`),
        axios.get(`${API_BASE_URL}/categorias`),
      ]);
      setMedicamentos(medicamentosRes.data);
      setCategorias(categoriasRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("No se pudieron cargar los datos de administración.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addMedicamento = async (data) => {
    try {
      await axios.post(`${API_BASE_URL}/medicamentos/create`, data);
      await fetchData();
    } catch (err) {
      console.error("Error creating medicamento:", err);
      throw new Error(
        err.response?.data?.message || "Error al crear el medicamento."
      );
    }
  };

  const updateMedicamento = async (id, data) => {
    try {
      await axios.put(`${API_BASE_URL}/medicamentos/${id}`, data);
      await fetchData();
    } catch (err) {
      console.error(`Error updating medicamento ${id}:`, err);
      throw new Error(
        err.response?.data?.message || "Error al actualizar el medicamento."
      );
    }
  };

  const removeMedicamento = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/medicamentos/${id}`);
      await fetchData();
    } catch (err) {
      console.error("Error deleting medicamento:", err);
      throw new Error(
        err.response?.data?.message || "Error al eliminar el medicamento."
      );
    }
  };

  return {
    medicamentos,
    categorias,
    loading,
    error,
    addMedicamento,
    updateMedicamento,
    removeMedicamento,
  };
}
