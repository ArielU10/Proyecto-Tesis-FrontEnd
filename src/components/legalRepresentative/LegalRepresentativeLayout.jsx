import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import '../../styles/legalRepresentantive/LegalRepresentantiveHome.css';
import JN_logo from '../../assets/legalRepresentativeAssets/JN_logo.svg';
import { useAuth } from '../../context/AuthContext';

const LegalRepresentativeLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigate } = useNavigation();
  const { logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (page) => {
    const routes = {
      'qr': 'generate-qr',
      'attendance': 'student/1/assistance',
      'incidents': 'student/1/incidents'
    };
    navigate({ module: 'legal-representantive', page: routes[page] || page });
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
      logout();
      navigate({ module: 'login' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="portal-container">
      <div className="background-base"></div>
      <div className="gradient-overlay-top"></div>
      <div className="gradient-overlay-middle"></div>

      <header className="header">
        <div className="logo-container">
          <img src={JN_logo} alt="Logo" />
        </div>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
      </header>

      <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <button className="nav-item" onClick={() => handleNavigation('qr')}>GENERAR QR</button>
        <button className="nav-item" onClick={() => handleNavigation('attendance')}>ASISTENCIA</button>
        <button className="nav-item" onClick={() => handleNavigation('incidents')}>INCIDENTES</button>
        <button className="nav-item" onClick={handleLogout}>SALIR</button>
      </nav>

      {/* Contenedor principal que asegura el layout correcto */}
      <div className="main-wrapper">
        <main className="main-content">
          <Outlet />
        </main>
        
        <footer className="footer">
          <div className="footer-content">
            <span className="representative-footer-text">JESUS DE NAZARETH</span>
            <span className="representative-footer-text">TODOS LOS DERECHOS RESERVADOS</span>
          </div>
        </footer>
      </div>

      <div className="bottom-gradient"></div>
    </div>
  );
};

export default LegalRepresentativeLayout;