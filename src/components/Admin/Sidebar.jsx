import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo_jn.svg';
import '../../styles/components/sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <img src={logo} alt="Logo JN" className="logo-image" />

        <nav className="menu">
          <ul>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive || location.pathname === '/admin'
                    ? 'sidebar-link active'
                    : 'sidebar-link'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/attendance"
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
              >
                Registro de Asistencias
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/incidents"
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
              >
                Faltas y Observaciones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
              >
                Usuarios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/courses"
                className={({ isActive }) =>
                  isActive || location.pathname === '/admin/courses'
                    ? 'sidebar-link active'
                    : 'sidebar-link'
                }
              >
                Cursos / Paralelos
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">¡Soy Nazareno, soy triunfador!</div>
      </div>
    </aside>
  );
};

export default Sidebar;
