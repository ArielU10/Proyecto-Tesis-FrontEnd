import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModalIncidente from "./modalIncidente";

const ModalEstudiantes = ({ show, onHide, students }) => {
  const [showIncidenteModal, setShowIncidenteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const abrirModalIncidente = (student) => {
    setSelectedStudent(student);
    setShowIncidenteModal(true);
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
                  <strong>{student.firstName} {student.lastName}</strong>
                </div>
                <div className="d-flex gap-2 flex-wrap mt-2">
                  <Button variant="success" size="sm">Asistencia</Button>
                  <Button variant="warning" size="sm">Falta</Button>
                  <Button variant="secondary" size="sm">Atraso</Button>
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
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para incidentes */}
      <ModalIncidente
        show={showIncidenteModal}
        onHide={() => setShowIncidenteModal(false)}
        student={selectedStudent}
      />
    </>
  );
};

export default ModalEstudiantes;
