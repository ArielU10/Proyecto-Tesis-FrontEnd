import { Header } from './Header';
import '../../styles/components/adminLayout.css';

export const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="admin-grid">
      <aside className="sidebar">
        <img src="/src/assets/miniLogoJN.png" alt="Logo JN" className="logo-image" />
        <nav className="menu">
          <ul>
            <li>Home</li>
            <li>Asistencias</li>
            <li>Observaciones</li>
            <li>Atrasos</li>
            <li>Gestión de Usuarios</li>
            <li>Cerrar Sesion</li>
          </ul>
        </nav>
        <div className="sidebar-footer">¡Soy Nazareno, soy triunfador!</div>
      </aside>

      <div className="layout-content">
        <Header />
        <main className="main">{children}</main>
      </div>
    </div>
  );
};