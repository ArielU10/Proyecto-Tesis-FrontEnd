import React, { useState, useEffect } from "react";
import ModalIncidente from "./modalIncidente";
import {
  createAsistance,
  checkAsistenciaTomada,
} from "../../services/asistanceApi";
import "../../styles/professor/modalCustom.css";

const ModalEstudiantes = ({ show, onHide, students, courseId }) => {
  const [showIncidenteModal, setShowIncidenteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [asistencias, setAsistencias] = useState({});
  const [idProfessor, setIdProfessor] = useState(null);
  const [asistenciaTomada, setAsistenciaTomada] = useState(false);

  // Obtener el ID del profesor desde localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "professor") {
      setIdProfessor(user.roleId);
    }
  }, []);

  // Verificar si ya se tomó asistencia cuando se muestre el modal y tengamos el id del profesor
  useEffect(() => {
    const verificarAsistencia = async () => {
      if (show && courseId && idProfessor) {
        try {
          const respuesta = await checkAsistenciaTomada(courseId, idProfessor);
          setAsistenciaTomada(respuesta === true || respuesta?.alreadyTaken === true);
        } catch (error) {
          console.error("Error al verificar si ya se tomó asistencia:", error);
        }
      }
    };

    verificarAsistencia();
  }, [show, courseId, idProfessor]);

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
      const estudiantesSinAsistencia = students.filter(
        (student) => !asistencias[student.id_student]
      );

      if (estudiantesSinAsistencia.length > 0) {
        alert("⚠️ Debes registrar asistencia de todos los estudiantes.");
        return;
      }

      const registros = Object.entries(asistencias);

      for (let [studentId, status] of registros) {
        const asistenciaData = {
          id_student: parseInt(studentId),
          id_professor: idProfessor,
          id_course: courseId,
          status,
          justification: null,
          news: null,
        };

        await createAsistance(asistenciaData);
      }

      alert("✅ Asistencias registradas correctamente.");

      // Volver a verificar después de registrar
      const respuesta = await checkAsistenciaTomada(courseId, idProfessor);
      setAsistenciaTomada(respuesta === true || respuesta?.alreadyTaken === true);

      setAsistencias({});
    } catch (error) {
      if (error.response?.status === 409) {
        alert("⚠️ Ya se tomó asistencia hoy para este curso.");
        setAsistenciaTomada(true);
      } else {
        console.error("Error al registrar asistencias:", error);
        alert("❌ Error inesperado al registrar asistencia.");
      }
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
            {asistenciaTomada && (
              <div className="alert alert-info text-center mb-3">
                ✅ Ya se tomó asistencia hoy para este curso.
              </div>
            )}
            {students.length > 0 ? (
              students.map((student) => (
                <div className="student-row" key={student.id_student}>
                  <div className="student-name">
                    {student.lastName} {student.firstName}
                  </div>
                  <div className="student-actions">
                    {!asistenciaTomada && (
                      <>
                        <button
                          className={
                            asistencias[student.id_student] === "present"
                              ? "btn success"
                              : "btn outline-success"
                          }
                          onClick={() =>
                            handleAsistencia(student.id_student, "present")
                          }
                        >
                          Asiste
                        </button>
                        <button
                          className={
                            asistencias[student.id_student] === "absent"
                              ? "btn warning"
                              : "btn outline-warning"
                          }
                          onClick={() =>
                            handleAsistencia(student.id_student, "absent")
                          }
                        >
                          Falta
                        </button>
                        <button
                          className={
                            asistencias[student.id_student] === "late"
                              ? "btn info"
                              : "btn outline-info"
                          }
                          onClick={() =>
                            handleAsistencia(student.id_student, "late")
                          }
                        >
                          Atraso
                        </button>
                      </>
                    )}
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
            {!asistenciaTomada && (
              <button className="btn primary" onClick={handleRegistrarAsistencias}>
                Registrar Asistencias
              </button>
            )}
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
