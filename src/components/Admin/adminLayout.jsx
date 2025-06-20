import { Header } from './Header';
import '../../styles/components/adminLayout.css';

export const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="admin-grid">
      <aside className="sidebar">
        {/* Contenedor que organiza logo, menú y slogan */}
        <div className="sidebar-content">
          <img src="/src/assets/logo_jn.svg" alt="Logo JN" className="logo-image" />

          <nav className="menu">
            <ul>
              <li>Home</li>
              <li>Registro de Asistencias</li>
              <li>Faltas y Observaciones</li>
              <li>Usuarios</li>
              <li>Cursos / Paralelos</li>
            </ul>
          </nav>

          <div className="sidebar-footer">¡Soy Nazareno, soy triunfador!</div>
        </div>
      </aside>

      <div className="layout-content">
        <Header />
        <main className="main">{children}</main>
      </div>

      <footer className="admin-footer">
        <div className="footer-content">
          <div className="footer-text">
            <p>© 2025 Unidad Educativa Jesús de Nazareth. Todos los derechos reservados.</p>
            <p>Desarrollado por TesisGroup · v1.0.0</p>
          </div>

          <div className="footer-icons">
            <img src="/src/assets/logo_redes/wssp.svg" alt="WhatsApp" />
            <a href="https://www.facebook.com/UnidadEducativaJesusDeNazareth" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/logo_redes/fb.svg" alt="Facebook" />
            </a>
            <img src="/src/assets/logo_redes/x.svg" alt="X" />
            <img src="/src/assets/logo_redes/inst.svg" alt="Instagram" />
            <img src="/src/assets/logo_redes/tiktok.svg" alt="TikTok" />
          </div>
        </div>
      </footer>
    </div>
  );
};
