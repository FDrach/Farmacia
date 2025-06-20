import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import HomePages from "./pages/HomePages"
import Ofertas from "./components/ofertas"
import Productos from "./components/productos"
import Footer from "./components/footer"
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
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
