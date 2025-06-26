import React, { useState, useEffect } from "react";
import { getAtrazosByCourseAndProfessor } from "../../services/asistanceApi";
import "../../styles/professor/modalAtrasos.css";

const ModalAtrasos = ({ show, onHide, courses, professorId }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [atrasos, setAtrasos] = useState([]);
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  useEffect(() => {
    if (selectedCourse && professorId) {
      getAtrazosByCourseAndProfessor(professorId, selectedCourse)
        .then(setAtrasos)
        .catch((err) => console.error("Error al cargar atrasos", err));
    } else {
      setAtrasos([]);
    }
  }, [selectedCourse, professorId]);

  const groupedByStudent = {};
  atrasos.forEach((item) => {
    const id = item.Student.id_student;
    if (!groupedByStudent[id]) {
      groupedByStudent[id] = {
        student: item.Student,
        dates: [],
      };
    }
    groupedByStudent[id].dates.push(item.date);
  });

  // Ordenar estudiantes alfabéticamente por apellido y luego por nombre
  const sortedStudents = Object.values(groupedByStudent).sort((a, b) => {
    const lastNameCompare = a.student.lastName.localeCompare(b.student.lastName);
    if (lastNameCompare !== 0) return lastNameCompare;
    return a.student.firstName.localeCompare(b.student.firstName);
  });

  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          <h2>Historial de Atrasos</h2>
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

          {sortedStudents.length > 0 ? (
            <div className="estudiantes-lista">
              {sortedStudents.map(({ student, dates }) => (
                <div key={student.id_student} className="estudiante-item">
                  <p
                    className="nombre-estudiante"
                    onClick={() =>
                      setExpandedStudentId((prev) =>
                        prev === student.id_student ? null : student.id_student
                      )
                    }
                  >
                    {student.lastName} {student.firstName}
                  </p>

                  {expandedStudentId === student.id_student && (
                    <div className="inasistencias-historial">
                      <ul>
                        {dates.map((date, idx) => (
                          <li key={idx}>{new Date(date).toLocaleDateString()}</li>
                        ))}
                      </ul>
                      <p>Total: {dates.length} atraso(s)</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            selectedCourse && (
              <p className="text-muted">No hay atrasos en este curso.</p>
            )
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
