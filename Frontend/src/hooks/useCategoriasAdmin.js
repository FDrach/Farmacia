import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export function useCategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/categorias`);
      setCategorias(response.data);
    } catch (err) {
      setError("No se pudieron cargar las categorías.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addCategoria = async (nombre) => {
    try {
      await axios.post(`${API_BASE_URL}/categorias/create`, { nombre });
      await fetchData();
    } catch (err) {
      console.error("Error creating category:", err);
      throw new Error(
        err.response?.data?.message || "Error al crear la categoría."
      );
    }
  };

  const updateCategoria = async (id, nombre) => {
    try {
      await axios.put(`${API_BASE_URL}/categorias/${id}`, { nombre });
      await fetchData();
    } catch (err) {
      console.error("Error updating category:", err);
      throw new Error(
        err.response?.data?.message || "Error al actualizar la categoría."
      );
    }
  };

  const removeCategoria = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/categorias/${id}`);
      await fetchData();
    } catch (err) {
      console.error("Error deleting category:", err);
      throw new Error(
        err.response?.data?.message || "Error al eliminar la categoría."
      );
    }
  };

  return {
    categorias,
    loading,
    error,
    addCategoria,
    updateCategoria,
    removeCategoria,
  };
}
