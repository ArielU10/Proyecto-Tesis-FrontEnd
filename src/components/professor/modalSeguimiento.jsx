import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { getIncidentsByStudentId, updateIncident } from "../../services/incidentApi";

const ModalSeguimiento = ({ show, onHide, student, onFollowUpUpdated }) => {
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (student) {
      getIncidentsByStudentId(student.id_student).then((data) => {
        setIncidents(data);
        const initialFormData = {};
        data.forEach((incident) => {
          initialFormData[incident.id_incident] = {
            resolution: incident.resolution || "",
            status: incident.status
          };
        });
        setFormData(initialFormData);
      });
    }
  }, [student]);

  const handleFieldChange = (incidentId, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [incidentId]: {
        ...prevState[incidentId],
        [field]: value
      }
    }));
  };

  const handleSave = async (incidentId) => {
    try {
      const incident = incidents.find((inc) => inc.id_incident === incidentId);
      const { resolution, status } = formData[incidentId];

      await updateIncident(incidentId, {
        type: incident.type,
        description: incident.description,
        date: incident.date,
        id_student: incident.id_student,
        id_professor: incident.id_professor,
        status,
        resolution,
      });

      if (status === "resolved") {
        onFollowUpUpdated();
        onHide();
      }
    } catch (error) {
      console.error("Error al actualizar seguimiento:", error);
    }
  };

  // NUEVOS FORMATEADORES:
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Seguimiento de {student?.lastName} {student?.firstName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {incidents.length === 0 ? (
          <p className="text-muted">No hay incidentes pendientes para este estudiante</p>
        ) : (
          incidents.map((incident) => (
            <Card key={incident.id_incident} className="mb-3">
              <Card.Body>
                <p><strong>Fecha:</strong> {formatDate(incident.date)}</p>
                <p><strong>Hora:</strong> {formatTime(incident.date)}</p>
                <p><strong>Profesor:</strong> {incident.professor?.firstName} {incident.professor?.lastName}</p>
                <p><strong>Incidente:</strong> {incident.description}</p>

                <Form.Group className="mb-3">
                  <Form.Label>Resolución</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData[incident.id_incident]?.resolution || ""}
                    onChange={(e) =>
                      handleFieldChange(incident.id_incident, "resolution", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={formData[incident.id_incident]?.status || "pending"}
                    onChange={(e) =>
                      handleFieldChange(incident.id_incident, "status", e.target.value)
                    }
                  >
                    <option value="pending">Pendiente</option>
                    <option value="resolved">Resuelto</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="success" onClick={() => handleSave(incident.id_incident)}>
                  Guardar seguimiento
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalSeguimiento;
