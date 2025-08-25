import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EditAdminProfile from './EditAdminProfile';
import '../../styles/components/header.css';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
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
    setShowEditProfile(true);
    setShowMenu(false);
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  // Función para obtener las iniciales del usuario
  const getUserInitials = () => {
    if (!user) return 'U';
    
    const firstName = user.firstName || user.name || '';
    const lastName = user.lastName || '';
    
    const firstInitial = firstName.charAt(0).toUpperCase() || '';
    const lastInitial = lastName.charAt(0).toUpperCase() || '';
    
    // Si solo hay un nombre, tomar las primeras dos letras
    if (!lastInitial && firstName.length > 1) {
      return (firstInitial + firstName.charAt(1).toUpperCase());
    }
    
    return firstInitial + lastInitial || 'U';
  };

  return (
    <>
      <header className="admin-header">
        <input type="text" className="search-bar" placeholder="Buscar" />

        <div className="profile-container" ref={menuRef}>
          <div className="profile-button" onClick={() => setShowMenu(!showMenu)}>
            <span className="username">
              {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Usuario'}
            </span>
            <div className="user-avatar-circle user-initials">
              <span className="initials-text">
                {getUserInitials()}
              </span>
            </div>
          </div>

          {showMenu && (
            <div className="user-dropdown-menu">
              <button onClick={handleShowProfile}>👤 Editar perfil</button>
              <button onClick={handleLogout}>🔐 Cerrar sesión</button>
            </div>
          )}
        </div>
      </header>

      {/* Modal de editar perfil */}
      <EditAdminProfile
        show={showEditProfile}
        onHide={() => setShowEditProfile(false)}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  );
};

export default Header;