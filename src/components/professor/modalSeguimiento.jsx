import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getIncidentsByStudentId, updateIncident } from "../../services/incidentApi";

const ModalSeguimiento = ({ show, onHide, student, onFollowUpUpdated }) => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [resolution, setResolution] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (student) {
      getIncidentsByStudentId(student.id_student).then((data) => {
        if (data.length > 0) {
          const incident = data[0];
          setSelectedIncident(incident);
          setResolution(incident.resolution || "");
          setStatus(incident.status || "pending");
        }
      });
    }
  }, [student]);

  const handleSave = async () => {
    try {
      await updateIncident(selectedIncident.id_incident, {
        type: selectedIncident.type,
        description: selectedIncident.description,
        date: selectedIncident.date,
        id_student: selectedIncident.id_student,
        id_professor: selectedIncident.id_professor,
        status: status,
        resolution: resolution,
      });

      alert("Seguimiento actualizado correctamente");

      onHide();
      
      setTimeout(() => {
        if (status === "resolved" && onFollowUpUpdated) {
          onFollowUpUpdated();
        }
      }, 300);
    } catch (error) {
      console.error("Error al actualizar seguimiento:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Seguimiento del Estudiante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Estudiante:</strong> {student.lastName} {student.firstName}
        </p>

        {selectedIncident ? (
          <>
            <p>
              <strong>Incidente:</strong> {selectedIncident.description}
            </p>

            <Form.Group className="mb-3">
              <Form.Label>Resolución</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pendiente</option>
                <option value="resolved">Resuelto</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" onClick={handleSave}>
              Guardar seguimiento
            </Button>
          </>
        ) : (
          <p className="text-muted">No hay incidentes para este estudiante</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalSeguimiento;
