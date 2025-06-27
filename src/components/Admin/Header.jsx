import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/adminLayout.css';

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error al leer usuario:', error);
      setUser(null);
    }
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
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar Estudiante"
      />

      <div className="profile-section" onClick={() => setShowMenu(!showMenu)}>
      <span className="username">
        {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Usuario'}
      </span>

        <div className="user-avatar-circle">
          <img
            src="/src/assets/avatarMujer.png"
            alt="Avatar"
            className="user-avatar"
          />
        </div>

        {showMenu && (
          <div className="user-dropdown-menu">
            <button onClick={handleShowProfile}>👤 Mi perfil</button>
            <button onClick={handleEditProfile}>✏️ Editar perfil</button>
            <button onClick={handleToggleTheme}>
              🎨 Cambiar a {darkMode ? 'Claro' : 'Oscuro'}
            </button>
            <button onClick={handleLogout}>🔐 Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  );
};
