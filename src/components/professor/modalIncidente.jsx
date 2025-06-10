import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createIncident } from "../../services/incidentApi";

const ModalIncidente = ({ show, onHide, student, courseId }) => {
  const [type, setType] = useState("disciplinary");
  const [description, setDescription] = useState("");

  const tiposIncidente = [
    { value: "academic", label: "Académica" },
    { value: "disciplinary", label: "Disciplinaria" },
    { value: "medical", label: "Médica" },
    { value: "security", label: "Seguridad" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIncident = {
      type,
      description,
      id_student: student?.id_student || student?.id, // adapta según tu modelo
      id_professor: 1 // cambiar por el profesor autenticado si aplica
    };

    console.log("✅ Enviando:", newIncident);

    try {
      await createIncident(newIncident);
      alert("Incidente registrado correctamente");
      setDescription("");
      setType("disciplinary");
      onHide();
    } catch (error) {
      alert("❌ Error al registrar el incidente");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Incidente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Estudiante:</strong> {student?.firstName} {student?.lastName}</p>
        <p><strong>Curso:</strong> {courseId}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              {tiposIncidente.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-3" variant="danger" type="submit">Guardar Incidente</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalIncidente;
