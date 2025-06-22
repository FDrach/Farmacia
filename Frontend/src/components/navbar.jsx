import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logofar.png";
import { useState, useRef, useEffect } from "react";
import Login from "./login";
import { useBodyScrollLock } from "../hooks/Barra";
import useAuthStore from "../store/authStore";
import useCarritoStore from "../store/carritoStore";
import useCategoriasStore from "../store/categoriasStore";
import useFiltroCategoriaStore from "../store/filtroCategoriaStore";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [categoriasOpen, setCategoriasOpen] = useState(false);
  const [drawerCategoriasOpen, setDrawerCategoriasOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const menuRef = useRef();
  const cartRef = useRef();
  const categoriasRef = useRef();
  const navigate = useNavigate();

  // Obtener usuario y acciones del store
  const { usuario, logout } = useAuthStore();
  const { carrito } = useCarritoStore();
  const { categorias, fetchCategorias } = useCategoriasStore();
  const { setCategoria } = useFiltroCategoriaStore();

  useBodyScrollLock(drawerOpen);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const handleLogout = () => {
    logout();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/Productos?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/Productos");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (
        categoriasRef.current &&
        !categoriasRef.current.contains(event.target)
      ) {
        setCategoriasOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        {/* ... (Navbar logo, search bar) ... */}
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
          <form className="navbar-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="navbar-search-input"
              placeholder="¿Qué está buscando?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="navbar-search-btn" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="navbar-list-right">
          {/* Admin Link */}
          {usuario && usuario.tipo === "Administrador" && (
            <Link to="/administrador" className="navbar-link">
              <i className="fas fa-cogs"></i>
              <span className="navbar-text">Administrar</span>
            </Link>
          )}

          {usuario ? (
            <div
              className="navbar-link"
              style={{ position: "relative" }}
              ref={menuRef}
            >
              <span
                className="navbar-link navbar-link-green"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <i className="fas fa-user"></i>
                <span className="navbar-text">{usuario.nombre}</span>
                <i className="fas fa-caret-down"></i>
              </span>
              {menuOpen && (
                <div className="navbar-user-menu">
                  <div
                    className="navbar-user-menu-item navbar-user-menu-item-green"
                    onClick={() => {
                      if (window.confirm("¿Seguro que deseas cerrar sesión?")) {
                        handleLogout();
                      }
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="#"
              className="navbar-link"
              onClick={() => setLoginOpen(true)}
            >
              <i className="fas fa-user"></i>
              <span className="navbar-text">Iniciar sesión</span>
            </Link>
          )}
          <div
            className="navbar-link"
            style={{ position: "relative" }}
            ref={categoriasRef}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "8px",
                color: "#38b24a",
                fontWeight: "bold",
              }}
              onClick={() => setCategoriasOpen((open) => !open)}
            >
              <i className="fas fa-th-large"></i>
              Categorías
              <i className="fas fa-caret-down"></i>
            </span>
            {categoriasOpen && (
              <div className="navbar-user-menu">
                <div
                  className="navbar-user-menu-item"
                  style={{ color: "#38b24a", fontWeight: "bold" }}
                  onClick={() => {
                    setCategoria(null);
                    setCategoriasOpen(false);
                    navigate("/Productos");
                  }}
                >
                  Todas las categorías
                </div>
                {categorias.map((cat) => (
                  <div
                    key={cat.id}
                    className="navbar-user-menu-item"
                    style={{ color: "#38b24a" }}
                    onClick={() => {
                      setCategoria(cat.nombre);
                      navigate("/Productos");
                      setCategoriasOpen(false);
                    }}
                  >
                    {cat.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="navbar-link"
            style={{ position: "relative" }}
            ref={cartRef}
          >
            <span
              className="navbar-link navbar-link-green"
              style={{ position: "relative" }}
              onClick={() => setCartOpen((open) => !open)}
            >
              <i className="fas fa-shopping-cart"></i>
              <span className="navbar-text">Tu carrito</span>
              {/* Número de productos */}
              {carrito.length > 0 && (
                <span className="navbar-cart-badge">{carrito.length}</span>
              )}
            </span>
            {cartOpen && (
              <div className="navbar-cart-menu">
                <div className="navbar-cart-title">Carrito</div>
                {carrito.length === 0 ? (
                  <div className="navbar-cart-empty">
                    El carrito está vacío.
                  </div>
                ) : (
                  <ul className="navbar-cart-list">
                    {carrito.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="navbar-cart-item">
                        <span className="navbar-cart-producto-nombre">
                          {item.Nombre || item.nombre}
                        </span>
                        <span style={{ color: "#888" }}>x{item.cantidad}</span>
                      </li>
                    ))}
                    {carrito.length > 5 && <li>...y más</li>}
                  </ul>
                )}
                <button
                  className="navbar-cart-btn"
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/Carrito");
                  }}
                >
                  Ir al carrito
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* ... (Drawer and Login Modal) ... */}
      <div
        className={`drawer-backdrop${drawerOpen ? " open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={`drawer${drawerOpen ? " open" : ""}`}>
        <button
          className="drawer-close-btn"
          onClick={() => setDrawerOpen(false)}
        >
          
        </button>
        <ul className="drawer-list">
          <li>
            <Link to="/Ofertas" onClick={() => setDrawerOpen(false)}>
              <i className="fas fa-tags"></i> Ofertas
            </Link>
          </li>
          <li>
            <Link to="/Productos" onClick={() => setDrawerOpen(false)}>
              <i className="fas fa-box"></i> Productos
            </Link>
          </li>
          <li>
            <div
              className="drawer-categorias-link"
              onClick={() => setDrawerCategoriasOpen((open) => !open)}
            >
              <i className="fas fa-th-large"></i>
              Categorías
              <i
                className={`fas fa-caret-${
                  drawerCategoriasOpen ? "up" : "down"
                }`}
                style={{ fontSize: "1rem" }}
              ></i>
            </div>
            {drawerCategoriasOpen && (
              <ul className="drawer-categorias-list">
                <li>
                  <button
                    className="drawer-categoria-item"
                    style={{ color: "#38b24a", fontWeight: "bold" }}
                    onClick={() => {
                      setCategoria(null);
                      navigate("/Productos");
                      setDrawerOpen(false);
                    }}
                  >
                    Todas las categorías
                  </button>
                </li>
                {categorias.map((cat) => (
                  <li key={cat.id}>
                    <button
                      className="drawer-categoria-item"
                      style={{ color: "#38b24a" }}
                      onClick={() => {
                        setCategoria(cat.nombre);
                        navigate("/Productos");
                        setDrawerOpen(false);
                      }}
                    >
                      {cat.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </aside>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
