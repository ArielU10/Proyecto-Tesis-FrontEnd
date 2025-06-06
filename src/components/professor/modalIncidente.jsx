import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

const ModalIncidente = ({ show, onHide, studentId, professorId }) => {
  const [incidentData, setIncidentData] = useState({
    type: "",
    description: "",
    id_student: null,
    id_professor: null,
  });

  useEffect(() => {
    setIncidentData((prev) => ({
      ...prev,
      id_student: studentId,
      id_professor: professorId,
    }));
  }, [studentId, professorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("Datos enviados al backend: ", incidentData);

    try {
      const response = await fetch("http://localhost:3000/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar el incidente");
      }

      alert("Incidente registrado exitosamente");
      onHide();
    } catch (error) {
      console.error("Error al registrar incidente:", error);
      alert("Ocurrió un error al registrar el incidente");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Incidente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Tipo de incidente</label>
          <select
            className="form-select"
            name="type"
            value={incidentData.type}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="academic">Académica</option>
            <option value="disciplinary">Disciplinaria</option>
            <option value="medical">Médica</option>
            <option value="security">Seguridad</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={incidentData.description}
            onChange={handleChange}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Guardar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalIncidente;
