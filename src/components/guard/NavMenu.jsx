import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavMenu = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setOpen(!open)

  const handleLogout = () => {
    
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    // Cerrar el menú
    setOpen(false)
    
    // Redirigir al login
    navigate('/login')
    
  }

  const navItems = [
    { path: '/guard', label: 'Inicio' },
    { path: '/guard/qrScan', label: 'Escanear QR' },
  ]

  return (
    <div className="nav-menu">
      {/* Menú hamburguesa para móviles */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menú móvil */}
      <nav className={`mobile-nav ${open ? 'active' : ''}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className="nav-item"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="nav-separator"></li>
          <li>
            <button className="nav-item logout-btn" onClick={handleLogout}>
              Salir
            </button>
          </li>
        </ul>
      </nav>

      {/* Menú de escritorio */}
      <nav className="desktop-nav">
        <ul className="desktop-nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className="nav-item">
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button className="header-logout" onClick={handleLogout}>
              Salir
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavMenu
