import React, { useState, useEffect } from "react";
import SelectCursoHistorial from "./selectCursoHistorial";
import ListaEstudiantesHistorial from "./listaEstudiantesHistorial";
import { getCoursesByProfessor } from "../../services/courseApi";
import { getStudentsByCourse } from "../../services/studentApi";
import { getIncidentsByStudentId } from "../../services/incidentApi";
import "../../styles/professor/modalHistorial.css";

const ModalHistorialIncidentes = ({ show, onHide, professorId }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);

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
      getStudentsByCourse(courseId)
        .then((data) => {
          //  Ordenar por apellido y luego por nombre
          const sorted = data.sort((a, b) => {
            const lastNameCompare = a.lastName.localeCompare(b.lastName);
            if (lastNameCompare !== 0) return lastNameCompare;
            return a.firstName.localeCompare(b.firstName);
          });
          setStudents(sorted);
        })
        .catch(err => console.error("Error al cargar estudiantes:", err));
    } else {
      setStudents([]);
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

          {selectedCourse && students.length === 0 && (
            <p className="text-muted">No hay estudiantes en este curso.</p>
          )}

          {selectedCourse && students.length > 0 && (
            <ListaEstudiantesHistorial
              students={students}
              getIncidentsByStudentId={getIncidentsByStudentId}
            />
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
