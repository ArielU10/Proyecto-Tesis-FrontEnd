import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import { getInasistenciasByCourse } from "../../services/asistanceApi";

const ModalInasistencias = ({ show, onHide, courses, professorId }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [inasistencias, setInasistencias] = useState([]);

  useEffect(() => {
    if (selectedCourse) {
      getInasistenciasByCourse(selectedCourse)
        .then((data) => {
          setInasistencias(data);
        })
        .catch((err) => {
          console.error("Error al cargar inasistencias", err);
        });
    }
  }, [selectedCourse]);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Histórico de Inasistencias</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Seleccione un curso:</Form.Label>
          <Form.Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">Seleccione...</option>
            {courses.map((course) => (
              <option key={course.id_course} value={course.id_course}>
                {course.courseName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {inasistencias.length > 0 ? (
          <ListGroup>
  {inasistencias.map((item) => (
    <ListGroup.Item key={item.id_asistance}>
      {item.date.substring(0, 10)} - {item.Student.lastName} {item.Student.firstName}
    </ListGroup.Item>
  ))}
</ListGroup>

        ) : (
          selectedCourse && <p className="text-muted">No hay inasistencias en este curso.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInasistencias;
