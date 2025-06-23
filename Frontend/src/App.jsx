import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePages from "./pages/HomePages";
import Ofertas from "./components/ofertas";
import Productos from "./pages/productos";
import Footer from "./components/footer";
import Carrito from "./pages/carrito";
import Administrador from "./pages/Administrador";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientesAdmin from "./pages/admin/ClientesAdmin";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import ProveedoresAdmin from "./pages/admin/ProveedoresAdmin";
import MedicamentosAdmin from "./pages/admin/MedicamentosAdmin";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import ComprasAdmin from "./pages/admin/ComprasAdmin";
import VentasList from "./components/VentasList";
import Faq from './pages/Faq';
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/Ofertas" element={<Ofertas />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/faq" element={<Faq />} />

            {/* Admin Routes */}
            <Route
              element={<ProtectedRoute allowedRoles={["Administrador"]} />}
            >
              <Route path="/administrador" element={<Administrador />}>
                {/* Nested routes for each admin tab */}
                <Route path="clientes" element={<ClientesAdmin />} />
                <Route path="usuarios" element={<UsuariosAdmin />} />
                <Route path="proveedores" element={<ProveedoresAdmin />} />
                <Route path="medicamentos" element={<MedicamentosAdmin />} />
                <Route path="categorias" element={<CategoriasAdmin />} />
                <Route path="compras" element={<ComprasAdmin />} />
                <Route path="ventas" element={<VentasList />} />
              </Route>
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
