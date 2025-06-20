import { Link } from "react-router-dom"


export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/Ofertas">Ofertas</Link>
        </li>
        <li>
          <Link to="/Productos">Productos</Link>
        </li>
      </ul>
    </nav>
  )
}