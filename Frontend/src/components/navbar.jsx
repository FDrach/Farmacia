import { Link } from "react-router-dom"
import logo from '../assets/logofar.png'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link">
        <img
          src={logo}
          alt="Farmacia Logo"
          className="navbar-logo"
          style={{ height: "48px", marginRight: "1rem" }}
        />
      </Link>
      <form className="navbar-search">
        <input
          type="text"
          placeholder=" ¿Que esta buscando? "
          className="navbar-search-input"
          id="buscador"
        />
        <button type="submit" className="navbar-search-btn">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <ul className="navbar-list navbar-list-center">
        <li>
          <Link to="/Ofertas">Ofertas</Link>
        </li>
        <li>
          <Link to="/Productos">Productos</Link>
        </li>
      </ul>
      <ul className="navbar-list navbar-list-right">
        <li>
          <Link to="/Login">
            <i className="fas fa-user"></i> Login
          </Link>
        </li>
        <li>
          <Link to="/Carrito">
            <i className="fas fa-shopping-cart"></i> Carrito
          </Link>
        </li>
      </ul>
    </nav>
  )
}