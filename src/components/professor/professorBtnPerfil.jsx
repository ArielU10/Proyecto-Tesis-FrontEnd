import React, { useState, useEffect, useRef } from "react";
import { FiEdit, FiLogOut } from "react-icons/fi"; // Íconos de editar y salir

const UserDropdown = ({ onLogout, onEditProfile }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="user-dropdown"
      ref={dropdownRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        className="user-name-button"
        onClick={toggleMenu}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {user?.firstName} {user?.lastName}
      </button>

      {showMenu && (
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
            padding: "0.5rem 0",
            zIndex: 999,
          }}
        >
          <button
            onClick={onEditProfile}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#333",
            }}
          >
            <FiEdit style={{ marginRight: "8px", color: "#981426" }} />
            Perfil
          </button>
          <button
            onClick={onLogout}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#333",
            }}
          >
            <FiLogOut style={{ marginRight: "8px", color: "#981426" }} />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
