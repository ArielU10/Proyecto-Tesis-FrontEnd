// src/components/professor/headerProfessor.jsx
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/logo_jn.svg";
import ModalBusqueda from "./modalBusqueda.jsx";
import EditarPerfilProfesor from "./perfilProfessor.jsx";
import { searchStudentsByLastNameAndProfessor } from "../../services/studentApi";

const HeaderProfesor = ({ onLogout }) => {
  const [professorName, setProfessorName] = useState("Cargando...");
  const [apellido, setApellido] = useState("");
  const [students, setStudents] = useState([]);
  const [showModalBusqueda, setShowModalBusqueda] = useState(false);
  const [showEditarPerfil, setShowEditarPerfil] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const id_professor = JSON.parse(localStorage.getItem("user"))?.roleId;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.role === "professor") {
      fetch(`http://localhost:3000/api/professors/${userData.roleId}`)
        .then((res) => res.json())
        .then((data) => setProfessorName(`${data.firstName} ${data.lastName}`))
        .catch(() => setProfessorName("Profesor"));
    }
  }, []);

  const handleSearch = async () => {
    if (!apellido.trim()) return;
    try {
      const resultados = await searchStudentsByLastNameAndProfessor(
        apellido,
        id_professor
      );
      setStudents(resultados);
      setShowModalBusqueda(true);
    } catch (error) {
      console.error("Error al buscar estudiantes:", error);
    }
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="div1 d-flex justify-content-between align-items-center px-4 py-3 position-relative">
      <div className="logo">
        <img src={logo} alt="Logo Institución" />
      </div>

      <div className="input-group custom-search w-50">
        <input
          type="text"
          className="form-control border-0 bg-transparent text-dark"
          placeholder="Buscar Estudiante"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="btn bg-transparent text-dark border-0"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      <div className="perfil position-relative">
        <button
          className="btn btn-link text-white text-decoration-none"
          onClick={handleToggleDropdown}
        >
          {professorName}
        </button>

        {showDropdown && (
          <div
            className="dropdown-menu show"
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "0.25rem",
              zIndex: 10,
              minWidth: "180px",
            }}
          >
            <button
              className="dropdown-item"
              onClick={() => {
                setShowEditarPerfil(true);
                setShowDropdown(false);
              }}
            >
              Editar Perfil
            </button>
            <button
              className="dropdown-item text-danger"
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Modales */}
      <ModalBusqueda
        show={showModalBusqueda}
        onHide={() => setShowModalBusqueda(false)}
        students={students}
      />

      <EditarPerfilProfesor
        show={showEditarPerfil}
        onHide={() => setShowEditarPerfil(false)}
      />
    </div>
  );
};

export default HeaderProfesor;
