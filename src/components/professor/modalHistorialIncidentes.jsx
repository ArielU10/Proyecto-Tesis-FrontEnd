import React, { useState, useEffect } from "react";
import SelectCursoHistorial from "./selectCursoHistorial";
import ListaEstudiantesHistorial from "./listaEstudiantesHistorial";
import { getCoursesByProfessor } from "../../services/courseApi";
import { getIncidentHistoryByCourse } from "../../services/incidentApi";
import "../../styles/professor/modalHistorial.css";

const ModalHistorialIncidentes = ({ show, onHide, professorId }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [studentsWithIncidents, setStudentsWithIncidents] = useState([]);

  useEffect(() => {
    if (show && professorId) {
      getCoursesByProfessor(professorId)
        .then(setCourses)
        .catch(err => console.error("Error al cargar cursos:", err));
    }
  }, [show, professorId]);

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    if (courseId) {
      getIncidentHistoryByCourse(courseId)
        .then(setStudentsWithIncidents)
        .catch(err => console.error("Error al cargar historial de incidentes:", err));
    } else {
      setStudentsWithIncidents([]);
    }
  };

  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          <h2>Historial de Incidentes</h2>
          <button onClick={onHide} className="custom-close-button">×</button>
        </div>

        <div className="custom-modal-body">
          {courses.length === 0 ? (
            <p className="text-muted">No hay cursos disponibles.</p>
          ) : (
            <SelectCursoHistorial
              courses={courses}
              selectedCourse={selectedCourse}
              onCourseChange={handleCourseChange}
            />
          )}

          {selectedCourse && studentsWithIncidents.length === 0 && (
            <p className="text-muted">No hay incidentes registrados en este curso.</p>
          )}

          {selectedCourse && studentsWithIncidents.length > 0 && (
            <ListaEstudiantesHistorial studentsWithIncidents={studentsWithIncidents} />
          )}
        </div>

        <div className="custom-modal-footer">
          <button className="custom-button" onClick={onHide}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalHistorialIncidentes;
