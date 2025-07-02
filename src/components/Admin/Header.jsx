import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/header.css';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleToggleTheme = () => {
    document.body.classList.toggle('dark-theme');
    setDarkMode(!darkMode);
  };

  const handleShowProfile = () => {
    alert(`👤 Perfil:\n\nNombre: ${user?.name}\nCorreo: ${user?.email || 'N/A'}\nTeléfono: ${user?.phone || 'N/A'}`);
  };

  const handleEditProfile = () => {
    alert('🛠 Función de edición de perfil aún no implementada.');
  };

  return (
    <header className="admin-header">
      <input type="text" className="search-bar" placeholder="Buscar Estudiante" />

      <div className="profile-container" ref={menuRef}>
        <div className="profile-button" onClick={() => setShowMenu(!showMenu)}>
          <span className="username">
            {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Usuario'}
          </span>
          <div className="user-avatar-circle">
            <img src="/src/assets/avatarMujer.png" alt="Avatar" className="user-avatar" />
          </div>
        </div>

        {showMenu && (
          <div className="user-dropdown-menu">
            <button onClick={handleShowProfile}>👤 Mi perfil</button>
            <button onClick={handleEditProfile}>✏️ Editar perfil</button>
            <button onClick={handleToggleTheme}>🎨 Cambiar a {darkMode ? 'Claro' : 'Oscuro'}</button>
            <button onClick={handleLogout}>🔐 Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
