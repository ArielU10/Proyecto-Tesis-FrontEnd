import { useState } from 'react';
import { User, Home, QrCode, Menu, X } from 'lucide-react';

// Layout Component
const GuardLayout = ({ children, title = "Sistema de Guardias" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="portal-container">
      {/* Background */}
      <div className="background-base bg-gradient-to-br from-red-900 via-red-800 to-red-900"></div>
      
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-red-800" />
          </div>
        </div>
        
        <h1 className="text-white font-bold text-lg hidden sm:block">{title}</h1>
        
        <button 
          className="menu-toggle"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="#home" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>
          <Home className="inline w-4 h-4 mr-2" />
          Inicio
        </a>
        <a href="#scanner" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>
          <QrCode className="inline w-4 h-4 mr-2" />
          Escanear QR
        </a>
        <a href="#students" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>
          <User className="inline w-4 h-4 mr-2" />
          Estudiantes
        </a>
      </nav>

      {/* Main Content */}
      <main className="main-wrapper">
        <div className="main-content">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2024 Sistema de Guardias v1.0</p>
        </div>
      </footer>

      {/* Bottom Gradient */}
      <div className="bottom-gradient"></div>
    </div>
  );
};

export default GuardLayout;