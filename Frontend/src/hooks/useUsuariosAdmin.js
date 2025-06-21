import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export function useUsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/usuarios`);
      setUsuarios(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addUser = async (userData) => {
    try {
      await axios.post(`${API_BASE_URL}/usuarios/create`, userData);
      await fetchData();
    } catch (err) {
      console.error("Error creating user:", err);

      throw new Error(
        err.response?.data?.message || "Error al crear el usuario."
      );
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await axios.put(`${API_BASE_URL}/usuarios/${id}`, userData);
      await fetchData();
    } catch (err) {
      console.error("Error updating user:", err);
      throw new Error(
        err.response?.data?.message || "Error al actualizar el usuario."
      );
    }
  };

  const removeUser = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/usuarios/${id}`);

      await fetchData();
    } catch (err) {
      console.error("Error deleting user:", err);
      throw new Error(
        err.response?.data?.message || "Error al eliminar el usuario."
      );
    }
  };

  return {
    usuarios,
    loading,
    error,
    addUser,
    updateUser,
    removeUser,
    refetch: fetchData,
  };
}
