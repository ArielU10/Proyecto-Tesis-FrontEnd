import React, { useEffect, useState } from "react";
import { getIncidentsByStudentId, updateIncident } from "../../services/incidentApi";
import "../../styles/professor/modalCustom.css";

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
            status: incident.status,
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
        [field]: value,
      },
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

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
  const formatTime = (dateStr) => new Date(dateStr).toLocaleTimeString();

  if (!show || !student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Seguimiento de {student.lastName} {student.firstName}</h2>
          <button className="close-button" onClick={onHide}>×</button>
        </div>

        <div className="modal-body">
          {incidents.length === 0 ? (
            <p className="text-muted">No hay incidentes pendientes para este estudiante</p>
          ) : (
            incidents.map((incident) => (
              <div className="incident-card" key={incident.id_incident}>
                <p><strong>Profesor:</strong>{" "}{incident.Professor?.firstName} {incident.Professor?.lastName}</p>
                <p><strong>Fecha:</strong> {formatDate(incident.date)}</p>
                <p><strong>Hora:</strong> {formatTime(incident.date)}</p>
                <p><strong>Incidente:</strong> {incident.description}</p>

                <div className="form-group">
                  <label>Resolución</label>
                  <textarea
                    rows={3}
                    value={formData[incident.id_incident]?.resolution || ""}
                    onChange={(e) => handleFieldChange(incident.id_incident, "resolution", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Estado</label>
                  <select
                    value={formData[incident.id_incident]?.status || "pending"}
                    onChange={(e) => handleFieldChange(incident.id_incident, "status", e.target.value)}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="resolved">Resuelto</option>
                  </select>
                </div>

                <button className="btn success" onClick={() => handleSave(incident.id_incident)}>
                  Guardar seguimiento
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSeguimiento;