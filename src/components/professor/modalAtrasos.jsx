import React, { useState, useEffect } from "react";
import { getAtrazosByCourseAndProfessor } from "../../services/asistanceApi";
import "../../styles/professor/modalAtrasos.css";

const ModalAtrasos = ({ show, onHide, courses, professorId }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [atrasos, setAtrasos] = useState([]);

  useEffect(() => {
    if (selectedCourse && professorId) {
      getAtrazosByCourseAndProfessor(professorId, selectedCourse)
        .then(setAtrasos)
        .catch((err) => console.error("Error al cargar atrasos", err));
    }
  }, [selectedCourse, professorId]);

  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          <h2>Histórico de Atrasos</h2>
          <button className="custom-close-button" onClick={onHide}>×</button>
        </div>

        <div className="custom-modal-body">
          <div className="select-curso-container">
            <label>Seleccione un curso:</label>
            <select
              className="custom-select-dark"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Seleccione...</option>
              {courses.map((course) => (
                <option key={course.id_course} value={course.id_course}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {atrasos.length > 0 ? (
            <ul className="inasistencias-list">
              {atrasos.map((item) => (
                <li key={item.id_asistance}>
                  <strong>{item.date.substring(0, 10)}</strong> – {item.Student.lastName} {item.Student.firstName}
                </li>
              ))}
            </ul>
          ) : (
            selectedCourse && <p className="text-muted">No hay atrasos en este curso.</p>
          )}
        </div>

        <div className="custom-modal-footer">
          <button className="custom-button" onClick={onHide}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAtrasos;
