import React from 'react';
import '../../styles/components/adminLayout.css';

export const Header = () => {
  return (
    <header className="admin-header">
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar Estudiante"
      />
      <div className="profile-section">
        <span className="username">Soledad Peñafiel</span>
        <img
          src="/src/assets/avatarMujer.png"
          alt="Avatar"
          className="user-avatar"
        />
      </div>
    </header>
  );
};