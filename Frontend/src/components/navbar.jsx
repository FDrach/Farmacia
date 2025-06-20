import { Link } from "react-router-dom"

import logo from '../assets/logofar.png' // Ajusta la ruta si es necesario

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src={logo}
          alt="Farmacia Logo"
          className="navbar-logo"
          style={{ height: "48px", marginRight: "1rem" }}
        />
      </Link>
      <ul className="navbar-list">
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