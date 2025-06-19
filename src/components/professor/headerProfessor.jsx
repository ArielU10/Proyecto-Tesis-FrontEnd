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
        .catch(err => {
          console.error("Error al obtener profesor:", err);
          setProfessorName("Profesor");
        });
    }
  }, []);

  return (
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
          {professorName}
        </button>
      </div>
    </div>
  );
};

export default HeaderProfesor;
