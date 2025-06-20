import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import HomePages from "./pages/HomePages"
import Ofertas from "./components/ofertas"
import Productos from "./components/productos"
import Footer from "./components/footer"
import Login from "./components/login"
import Carrito from "./components/carrito"
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
            <Route path="/Login" element={<Login />} />
            <Route path="/Carrito" element={<Carrito />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
