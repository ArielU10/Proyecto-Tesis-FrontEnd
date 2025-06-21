import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/logo_jn.svg";
import ModalBusqueda from "./modalBusqueda.jsx";
import { searchStudentsByLastNameAndProfessor } from "../../services/studentApi";

const HeaderProfesor = ({ onLogout }) => {
  const [professorName, setProfessorName] = useState("Cargando...");
  const [apellido, setApellido] = useState("");
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const id_professor = JSON.parse(localStorage.getItem("user"))?.roleId;

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

  const handleSearch = async () => {
    if (!apellido.trim()) return;
    try {
      const resultados = await searchStudentsByLastNameAndProfessor(apellido, id_professor);
      setStudents(resultados);
      setShowModal(true);
    } catch (error) {
      console.error("Error al buscar estudiantes:", error);
    }
  };

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
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="btn bg-transparent text-dark border-0" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="perfil text-white">
        <button className="btn btn-link text-white text-decoration-none" onClick={onLogout}>
          {professorName}
        </button>
      </div>

      <ModalBusqueda
        show={showModal}
        onHide={() => setShowModal(false)}
        students={students}
      />
    </div>
  );
};

export default HeaderProfesor;
