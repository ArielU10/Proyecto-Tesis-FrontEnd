import React, { useState } from "react";
import { createIncident } from "../../services/incidentApi"; // debe hacer POST a /api/incidents
import "../../styles/professor/modalCustom.css";

// Opciones de tipo de incidente con value para la BD y label para mostrar
const incidentTypes = [
  { value: "academic", label: "Académica" },
  { value: "disciplinary", label: "Disciplinaria" },
  { value: "medical", label: "Médica" },
  { value: "security", label: "Seguridad" },
];

const ModalIncidente = ({ show, onHide, student }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const id_professor = JSON.parse(localStorage.getItem("user"))?.roleId;

  const handleSave = async () => {
    if (!type || !description) {
      alert("⚠️ Por favor, complete todos los campos.");
      return;
    }

    try {
      const payload = {
        type, // ahora usa el campo correcto que el backend espera
        description,
        id_student: student.id_student,
        id_professor,
      };

      await createIncident(payload); // esta función debe llamar al endpoint POST /api/incidents
      alert("✅ Incidente registrado con éxito.");
      setType("");
      setDescription("");
      onHide();
    } catch (error) {
      console.error("Error al registrar incidente:", error);
      alert("❌ Ocurrió un error al guardar el incidente.");
    }
  };

  if (!show || !student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Registrar Incidente para {student.firstName} {student.lastName}</h2>
          <button className="close-button" onClick={onHide}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Tipo de Incidente:</label>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="">-- Selecciona un tipo --</option>
              {incidentTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe lo ocurrido..."
              rows={4}
              required
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn primary" onClick={handleSave}>Guardar</button>
          <button className="btn danger" onClick={onHide}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalIncidente;
