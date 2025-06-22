import Carrusel from "../components/Carrusel";
import CarruselCategorias from "../components/CarruselCategorias";

export default function HomePages() {
  return (
    <div>
      <Carrusel />
      <CarruselCategorias />
      {/* Otros contenidos del home */}
    </div>
  );
}