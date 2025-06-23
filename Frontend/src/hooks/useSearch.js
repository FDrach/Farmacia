import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/endpoints";

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allMedicamentos, setAllMedicamentos] = useState([]);

  const fetchAllMeds = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medicamentos`);
      setAllMedicamentos(response.data);
    } catch (error) {
      console.error("Failed to fetch all medications for search:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllMeds();
  }, [fetchAllMeds]);

  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchKeywords = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((word) => word);

    const filteredResults = allMedicamentos.filter((med) => {
      const medNombre = med.Nombre.toLowerCase();
      return searchKeywords.every((keyword) => medNombre.includes(keyword));
    });

    setResults(filteredResults);
  }, [searchTerm, allMedicamentos]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    isSearching,
    clearSearch: () => setSearchTerm(""),
  };
}
