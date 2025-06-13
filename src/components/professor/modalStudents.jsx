import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModalIncidente from "./modalIncidente";
import { createAsistance } from "../../services/asistanceApi";

const ModalEstudiantes = ({ show, onHide, students, courseId }) => {
  const [showIncidenteModal, setShowIncidenteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [asistencias, setAsistencias] = useState({});

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
      const registros = Object.entries(asistencias);

      for (let [studentId, status] of registros) {
        const asistenciaData = {
          id_student: parseInt(studentId),
          id_professor: 1,  // ✅ profesor fijo por ahora
          id_course: courseId,  // ✅ aquí agregamos el curso
          status: status,
          justification: null,
          news: null,
        };

        await createAsistance(asistenciaData);
      }

      alert("Asistencias registradas correctamente.");
      setAsistencias({});
      onHide();
    } catch (error) {
      console.error("Error al registrar asistencias:", error);
      alert("Error al registrar asistencias");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Estudiantes del Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {students.length > 0 ? (
            students.map((student) => (
              <div
                key={student.id_student}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <strong>{student.lastName} {student.firstName}</strong>
                </div>
                <div className="d-flex gap-2 flex-wrap mt-2">
                  <Button
                    variant={asistencias[student.id_student] === "present" ? "success" : "outline-success"}
                    size="sm"
                    onClick={() => handleAsistencia(student.id_student, "present")}
                  >
                    Asiste
                  </Button>
                  <Button
                    variant={asistencias[student.id_student] === "absent" ? "warning" : "outline-warning"}
                    size="sm"
                    onClick={() => handleAsistencia(student.id_student, "absent")}
                  >
                    Falta
                  </Button>
                  <Button
                    variant={asistencias[student.id_student] === "late" ? "info" : "outline-info"}
                    size="sm"
                    onClick={() => handleAsistencia(student.id_student, "late")}
                  >
                    Atraso
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => abrirModalIncidente(student)}
                  >
                    Incidente
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No hay estudiantes en este curso.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleRegistrarAsistencias}>
            Registrar Asistencias
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalIncidente
        show={showIncidenteModal}
        onHide={() => setShowIncidenteModal(false)}
        student={selectedStudent}
      />
    </>
  );
};

export default ModalEstudiantes;
