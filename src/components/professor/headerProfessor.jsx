import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/logo_jn.svg";

const HeaderProfesor = ({ onLogout }) => {
  const [professorName, setProfessorName] = useState("Cargando...");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.role === "professor") {
      fetch(`http://localhost:3000/api/professors/${userData.roleId}`)
        .then(res => res.json())
        .then(data => {
          setProfessorName(`${data.firstName} ${data.lastName}`);
        })
        .catch(() => setProfessorName("Profesor"));
    }
  }, []);

  return (
    <div className="div1 d-flex justify-content-between align-items-center px-4 py-3">
      <div className="logo">
        <img src={logo} alt="Logo Institución" />
      </div>

      <div className="input-group custom-search w-50">
        <input
          type="text"
          className="form-control border-0 bg-transparent text-dark"
          placeholder="Buscar Estudiante"
        />
        <button className="btn bg-transparent text-dark border-0">
          <FaSearch />
        </button>
      </div>

      <div className="perfil text-white">
        <button className="btn btn-link text-white text-decoration-none" onClick={onLogout}>
          {professorName}
        </button>
      </div>
    </div>
  );
};

export default HeaderProfesor;
