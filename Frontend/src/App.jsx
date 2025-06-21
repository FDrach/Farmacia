import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import HomePages from "./pages/HomePages"
import Ofertas from "./components/ofertas"
import Productos from "./components/productos"
import Footer from "./components/footer"
import Carrito from "./components/carrito"
import Administrador from "./pages/Administrador";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientesAdmin from "./pages/admin/ClientesAdmin";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import ProveedoresAdmin from "./pages/admin/ProveedoresAdmin";
import MedicamentosAdmin from "./pages/admin/MedicamentosAdmin";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import "./App.css"

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
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Administrador']} />}>
              <Route path="/administrador" element={<Administrador />}>
                {/* Nested routes for each admin tab */}
                <Route path="clientes" element={<ClientesAdmin />} />
                <Route path="usuarios" element={<UsuariosAdmin />} />
                <Route path="proveedores" element={<ProveedoresAdmin />} />
                <Route path="medicamentos" element={<MedicamentosAdmin />} />
                <Route path="categorias" element={<CategoriasAdmin />} />
              </Route>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App