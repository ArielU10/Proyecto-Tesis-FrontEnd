import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavMenu = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setOpen(!open)

  const handleLogout = () => {
    
    // Ejemplo básico:
    localStorage.removeItem('authToken') // Si usas token
    localStorage.removeItem('user') // Si guardas datos del usuario
    
    // O si usas sessionStorage:
    // sessionStorage.clear()
    
    // Cerrar el menú
    setOpen(false)
    
    // Redirigir al login
    navigate('/login') // Ajusta la ruta según tu aplicación
    
    // Opcional: Mostrar mensaje de confirmación
    // alert('Sesión cerrada correctamente')
  }

  const navItems = [
    { path: '/guard', label: 'Inicio' },
    { path: '/guard/qrScan', label: 'Escanear QR' },
  ]

  return (
    <div className="nav-menu">
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

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
          
          {/* Botón de salir */}
          <li>
            <button 
              className="nav-item logout-btn"
              onClick={handleLogout}
            >
              Salir
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavMenu
