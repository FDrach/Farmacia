import React from 'react';
import { useObrasSociales } from '../hooks/useObrasSociales';

export default function OSPages() {
  const { obrasSociales, loading } = useObrasSociales();

  if (loading) return <p>Cargando obras sociales...</p>;

  return (
    <div className="os-page">
      <h2>Obras Sociales</h2>
      <p>En esta sección encontrarás información sobre las obras sociales con las que trabajamos.</p>
      <p>Si no encontrás tu obra social, podés contactarnos para más información.</p>
      {obrasSociales.length === 0 ? (
        <p>No se encontraron obras sociales.</p>
      ) : (
        <ul className="os-list">
          {obrasSociales.map((obra, index) => (
            <li key={index} className="os-item">
              {obra.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
