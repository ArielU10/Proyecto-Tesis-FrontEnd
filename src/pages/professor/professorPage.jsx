import React from "react";
import { FaSearch, FaUser  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/professor/professorPage.css";

import logo from "../../assets/logo_jn.svg";

const ProfessorPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Puedes limpiar localStorage o cookies si guardas datos de sesión
    navigate("/"); // Redirige al login
  };

  return (
    <div className="parent">
      {/* Header */}
      <div className="div1 d-flex justify-content-between align-items-center px-4 py-2">
        <div className="logo">
          <img src={logo} alt="Logo Institución" className="logo" />
        </div>
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar Estudiante"
          />
          <button className="btn btn-outline-secondary">
            <FaSearch />
          </button>
        </div>
        <div className="perfil d-flex align-items-center gap-2">
          <button
            className="btn btn-link p-0 m-0 text-decoration-none"
            onClick={handleLogout}
          >
            Profe Victoria
          </button>
        </div>
      </div>

      {/* Panel izquierdo */}
      <div className="div2 p-4">
        <div className="bienvenida bg-warning rounded p-4 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-bold">Bienvenida, Victoria!</h4>
            <p>al Portal de Seguridad y Comunicación Escolar.</p>
            <ul>
              <li>✅ Retiro seguro con códigos QR</li>
              <li>📢 Notificaciones inmediatas</li>
              <li>🔐 Gestión de autorizaciones</li>
            </ul>
          </div>
          <img
            src="https://via.placeholder.com/100"
            alt="Avatar"
            className="rounded-circle"
          />
        </div>

        <div className="row mt-4 g-3">
          <div className="col-md-6">
            <div className="bg-white p-3 rounded shadow-sm">
              <h5 className="fw-bold">Cursos</h5>
              <p>Octavo A</p>
              <p>Segundo B</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-white p-3 rounded shadow-sm">
              <h5 className="fw-bold">Materias</h5>
              <p>Música</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="div3 p-4 bg-light d-flex flex-column justify-content-between">
        <div className="acciones row g-2 mb-4">
          <div className="col-6">
            <button className="btn btn-primary w-100 boton_accion" >Códigos QR</button>
          </div>
          <div className="col-6">
            <button className="btn btn-warning w-100 boton_accion">Inasistencias</button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-primary w-100 boton_accion"> Atrasos </button>
          </div>
          <div className="col-6">
            <button className="btn btn-danger w-100 boton_accion">Incidentes</button>
          </div>
        </div>

        <div className="seguimiento">
  <h6 className="fw-bold">Estudiantes en seguimiento</h6>
  <div className="d-flex gap-2 mt-2">
    <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
      <FaUser />
    </div>
    <div className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
      <FaUser />
    </div>
    <div className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
      <FaUser />
    </div>
    <button className="btn btn-outline-secondary rounded-circle p-1" style={{ width: 40, height: 40 }}>+</button>
  </div>
</div>

      </div>
    </div>
  );
};

export default ProfessorPage;
