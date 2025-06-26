import React, { useState, useEffect } from "react";
import { getInasistenciasByCourse } from "../../services/asistanceApi";
import "../../styles/professor/modalInasistencias.css";

const ModalInasistencias = ({ show, onHide, courses }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [inasistencias, setInasistencias] = useState([]);
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  useEffect(() => {
    if (selectedCourse) {
      getInasistenciasByCourse(selectedCourse)
        .then(setInasistencias)
        .catch((err) => console.error("Error al cargar inasistencias", err));
    } else {
      setInasistencias([]);
    }
  }, [selectedCourse]);

  const toggleStudent = (id) => {
    setExpandedStudentId((prev) => (prev === id ? null : id));
  };

  // Agrupar inasistencias por estudiante
  const groupedByStudent = {};
  inasistencias.forEach((i) => {
    const id = i.Student.id_student;
    if (!groupedByStudent[id]) {
      groupedByStudent[id] = {
        student: i.Student,
        dates: [],
      };
    }
    groupedByStudent[id].dates.push(i.date);
  });

  // Ordenar alfabéticamente por apellido y luego por nombre
  const sortedStudents = Object.values(groupedByStudent).sort((a, b) => {
    const lastNameComparison = a.student.lastName.localeCompare(b.student.lastName);
    if (lastNameComparison !== 0) return lastNameComparison;
    return a.student.firstName.localeCompare(b.student.firstName);
  });

  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          <h2>Historial de Inasistencias</h2>
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
                    onClick={() => toggleStudent(student.id_student)}
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
                      <p>Total: {dates.length} inasistencias</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            selectedCourse && (
              <p className="text-muted">No hay inasistencias en este curso.</p>
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

export default ModalInasistencias;
