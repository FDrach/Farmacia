import { useEffect, useState } from "react";
import axios from "axios";

export function useObrasSociales() {
  const [obrasSociales, setObrasSociales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/obras_sociales")
      .then(res => setObrasSociales(res.data))
      .catch(() => setObrasSociales([]))
      .finally(() => setLoading(false));
  }, []);

  return { obrasSociales, loading };
}