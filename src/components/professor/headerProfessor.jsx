import React from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/logo_jn.svg";

const HeaderProfesor = ({ onLogout }) => (
  <div className="div1 d-flex justify-content-between align-items-center px-4 py-2">
    <div className="logo">
      <img src={logo} alt="Logo Institución" className="logo" />
    </div>
    <div className="input-group w-50">
      <input type="text" className="form-control" placeholder="Buscar Estudiante" />
      <button className="btn btn-outline-secondary">
        <FaSearch />
      </button>
    </div>
    <div className="perfil d-flex align-items-center gap-2">
      <button className="btn btn-link p-0 m-0 text-decoration-none" onClick={onLogout}>
        Profe Victoria
      </button>
    </div>
  </div>
);

export default HeaderProfesor;