import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function Administrador() {
  const location = useLocation();

  const isBaseAdminPath = location.pathname === "/administrador";

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>
      <nav className="admin-nav">
        <NavLink to="/administrador/clientes" className="admin-nav-link">
          Clientes
        </NavLink>
        <NavLink to="/administrador/usuarios" className="admin-nav-link">
          Usuarios
        </NavLink>
        <NavLink to="/administrador/proveedores" className="admin-nav-link">
          Proveedores
        </NavLink>
        <NavLink to="/administrador/medicamentos" className="admin-nav-link">
          Medicamentos
        </NavLink>
        <NavLink to="/administrador/categorias" className="admin-nav-link">
          Categorías
        </NavLink>
        <NavLink to="/administrador/compras" className="admin-nav-link">
          Comprar
        </NavLink>
        <NavLink to="/administrador/ventas" className="admin-nav-link">
          Ventas
        </NavLink>
      </nav>
      <div className="admin-content">
        {isBaseAdminPath && (
          <p className="admin-welcome">
            Bienvenido al panel de administración. Selecciona una pestaña para
            comenzar.
          </p>
        )}
        <Outlet />
      </div>
    </div>
  );
}
