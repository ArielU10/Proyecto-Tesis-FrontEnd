import React, { useState, useEffect } from "react";
import ModalIncidente from "./modalIncidente";
import { createAsistance } from "../../services/asistanceApi";
import "../../styles/professor/modalCustom.css";

const ModalEstudiantes = ({ show, onHide, students, courseId }) => {
  const [showIncidenteModal, setShowIncidenteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [asistencias, setAsistencias] = useState({});
  const [idProfessor, setIdProfessor] = useState(null); // ✅ ID del profesor dinámico

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "professor") {
      setIdProfessor(user.roleId); // ✅ asignamos el id_professor desde localStorage
    }
  }, []);

  const abrirModalIncidente = (student) => {
    setSelectedStudent(student);
    setShowIncidenteModal(true);
  };

  const handleAsistencia = (studentId, status) => {
    setAsistencias((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleRegistrarAsistencias = async () => {
    try {
      // ✅ Validar que todos los estudiantes tengan asistencia
      const estudiantesSinAsistencia = students.filter(
        (student) => !asistencias[student.id_student]
      );

      if (estudiantesSinAsistencia.length > 0) {
        const nombres = estudiantesSinAsistencia
          .map((s) => `${s.firstName} ${s.lastName}`)
          .join(", ");
        alert(`⚠️ Debes registrar asistencia para todos los estudiantes.\nFaltan: ${nombres}`);
        return;
      }

      const registros = Object.entries(asistencias);

      for (let [studentId, status] of registros) {
        const asistenciaData = {
          id_student: parseInt(studentId),
          id_professor: idProfessor, // ✅ dinámico
          id_course: courseId,
          status: status,
          justification: null,
          news: null,
        };

        await createAsistance(asistenciaData);
      }

      alert("✅ Asistencias registradas correctamente.");
      setAsistencias({});
      onHide();
    } catch (error) {
      console.error("Error al registrar asistencias:", error);
      alert("❌ Error al registrar asistencias");
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2>Estudiantes del Curso</h2>
            <button className="close-button" onClick={onHide}>×</button>
          </div>

          <div className="modal-body">
            {students.length > 0 ? (
              students.map((student) => (
                <div className="student-row" key={student.id_student}>
                  <div className="student-name">
                    {student.lastName} {student.firstName}
                  </div>
                  <div className="student-actions">
                    <button
                      className={asistencias[student.id_student] === "present" ? "btn success" : "btn outline-success"}
                      onClick={() => handleAsistencia(student.id_student, "present")}
                    >
                      Asiste
                    </button>
                    <button
                      className={asistencias[student.id_student] === "absent" ? "btn warning" : "btn outline-warning"}
                      onClick={() => handleAsistencia(student.id_student, "absent")}
                    >
                      Falta
                    </button>
                    <button
                      className={asistencias[student.id_student] === "late" ? "btn info" : "btn outline-info"}
                      onClick={() => handleAsistencia(student.id_student, "late")}
                    >
                      Atraso
                    </button>
                    <button
                      className="btn danger"
                      onClick={() => abrirModalIncidente(student)}
                    >
                      Incidente
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay estudiantes en este curso.</p>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn primary" onClick={handleRegistrarAsistencias}>
              Registrar Asistencias
            </button>
          </div>
        </div>
      </div>

      <ModalIncidente
        show={showIncidenteModal}
        onHide={() => setShowIncidenteModal(false)}
        student={selectedStudent}
      />
    </>
  );
};

export default ModalEstudiantes;
