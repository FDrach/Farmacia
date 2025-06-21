import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export function useClientesAdmin() {
  const [clientes, setClientes] = useState([]);
  const [obrasSociales, setObrasSociales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [clientesRes, obrasSocialesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/clientes`),
        axios.get(`${API_BASE_URL}/obras-sociales`),
      ]);
      setClientes(clientesRes.data);
      setObrasSociales(obrasSocialesRes.data);
    } catch (err) {
      setError("No se pudieron cargar los datos de clientes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addCliente = async (clienteData) => {
    try {
      await axios.post(`${API_BASE_URL}/clientes/create`, clienteData);
      await fetchData();
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Error al crear el cliente."
      );
    }
  };

  const updateCliente = async (id, clienteData) => {
    try {
      await axios.put(`${API_BASE_URL}/clientes/${id}`, clienteData);
      await fetchData();
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Error al actualizar el cliente."
      );
    }
  };

  const removeCliente = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/clientes/${id}`);
      await fetchData();
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Error al eliminar el cliente."
      );
    }
  };

  const addObraSocial = async (osData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/obras-sociales/create`,
        osData
      );
      await fetchData();
      return response.data.id;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Error al crear la obra social."
      );
    }
  };

  return {
    clientes,
    obrasSociales,
    loading,
    error,
    addCliente,
    updateCliente,
    removeCliente,
    addObraSocial,
  };
}
