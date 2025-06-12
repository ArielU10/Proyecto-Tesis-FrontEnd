import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { getIncidentsByStudentId } from "../../services/incidentsApi";

const ModalSeguimiento = ({ show, onHide, student }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (student) {
      setLoading(true);
      getIncidentsByStudentId(student.id_student)
        .then((data) => {
          setIncidents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al cargar incidentes:", err);
          setLoading(false);
        });
    }
  }, [student]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Seguimiento de {student.lastName} {student.firstName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : incidents.length > 0 ? (
          <ul className="list-group">
            {incidents.map((incident) => (
              <li key={incident.id_incident} className="list-group-item">
                <strong>Tipo:</strong> {incident.type} <br />
                <strong>Descripción:</strong> {incident.description} <br />
                <strong>Fecha:</strong> {new Date(incident.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No hay incidentes registrados.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSeguimiento;
