import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/endpoints";
import "../../App.css";

const SERVER_URL = "http://localhost:8080";

export default function CarouselAdmin() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/carousel-images`);
      setImages(response.data);
    } catch (err) {
      setError("No se pudieron cargar las imágenes del carrusel.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, seleccione un archivo para subir.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("carouselImage", selectedFile);

    try {
      await axios.post(`${API_BASE_URL}/carousel-images/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelectedFile(null);
      document.getElementById("file-input").value = null;
      await fetchImages();
    } catch (err) {
      alert(err.response?.data?.message || "Error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageUrl) => {
    const filename = imageUrl.split("/").pop();
    if (
      window.confirm(
        `¿Está seguro de que desea eliminar la imagen "${filename}"?`
      )
    ) {
      try {
        await axios.delete(`${API_BASE_URL}/carousel-images/delete`, {
          data: { filename },
        });
        await fetchImages();
      } catch (err) {
        alert(err.response?.data?.message || "Error al eliminar la imagen.");
      }
    }
  };

  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-list-container">
      <div className="admin-list-item">
        <h3>Subir Nueva Imagen</h3>
        <div className="admin-form-inline">
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            className="form-input"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="btn btn-save"
          >
            {uploading ? "Subiendo..." : "Subir"}
          </button>
        </div>
      </div>

      <div className="admin-list-header" style={{ marginTop: "2rem" }}>
        <h3>Imágenes Actuales del Carrusel</h3>
      </div>
      <div className="admin-card-grid">
        {images.length > 0 ? (
          images.map((imgSrc) => (
            <div key={imgSrc} className="admin-card">
              <img
                src={`${SERVER_URL}${imgSrc}`}
                alt={imgSrc}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <div
                className="item-actions"
                style={{ justifyContent: "center" }}
              >
                <button
                  onClick={() => handleDelete(imgSrc)}
                  className="btn btn-delete"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay imágenes en el carrusel.</p>
        )}
      </div>
    </div>
  );
}
