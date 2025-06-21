import { Link } from "react-router-dom";
import logo from '../assets/logofar.png';
import { useState } from "react";
import Login from "./login";
import { useBodyScrollLock } from "../hooks/Barra";
import useAuthStore from "../store/authStore"; 

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Obtener usuario y acciones del store
  const { usuario, logout } = useAuthStore();

  useBodyScrollLock(drawerOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo-link">
          <Link to="/">
            <img
              src={logo}
              alt="Logo de Farmacia"
              className="navbar-logo"
              style={{ height: "48px", marginRight: "1rem" }}
            />
          </Link>
          <button
            className="drawer-menu-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="navbar-list-center">
          <form className="navbar-search">
            <input
              type="text"
              className="navbar-search-input"
              placeholder="¿Qué está buscando?"
            />
            <button className="navbar-search-btn" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="navbar-list-right">
          {usuario ? (
            <div className="navbar-link">
              <i className="fas fa-user"></i>
              <span className="navbar-text">{usuario.nombre}</span>
              <button onClick={handleLogout}>
                Salir
              </button>
            </div>
          ) : (
            <Link to="#" className="navbar-link" onClick={() => setLoginOpen(true)}>
              <i className="fas fa-user"></i>
              <span className="navbar-text">Iniciar sesión</span>
            </Link>
          )}
          <Link to="/carrito" className="navbar-link">
            <i className="fas fa-shopping-cart"></i>
            <span className="navbar-text">Tu carrito</span>
          </Link>
        </div>
      </nav>
      {/* Drawer lateral */}
      <div className={`drawer-backdrop${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(false)} />
      <aside className={`drawer${drawerOpen ? " open" : ""}`}>
        <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)}>×</button>
        <ul className="drawer-list">
          <li><Link to="/Ofertas"><i className="fas fa-tags"></i> Ofertas</Link></li>
          <li><Link to="/Productos"><i className="fas fa-box"></i> Productos</Link></li>
          {/* Agrega más enlaces aquí */}
        </ul>
      </aside>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}