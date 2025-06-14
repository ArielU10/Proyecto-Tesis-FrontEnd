import React, { useEffect, useState } from "react";
import { getProfessorById } from "../../services/professorApi";

const typeTranslation = {
  disciplinary: "Disciplinario",
  academic: "Académico",
  medical: "Médico",
  security: "Seguridad"
};

const statusTranslation = {
  pending: "Pendiente",
  resolved: "Resuelto"
};

const ListaIncidentesHistorial = ({ student, incidents }) => {
  const [professors, setProfessors] = useState({});

  useEffect(() => {
    if (incidents.length > 0) {
      const professorIds = [...new Set(incidents.map(i => i.id_professor))];
      professorIds.forEach(async id => {
        if (!professors[id]) {
          const data = await getProfessorById(id);
          setProfessors(prev => ({ ...prev, [id]: data }));
        }
      });
    }
  }, [incidents]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  };

  // 🔥 ORDENAMIENTO MEJORADO:
  const ordenarIncidentes = (incidentes) => {
    return [...incidentes].sort((a, b) => {
      // Prioridad: primero pendientes, después resueltos
      if (a.status !== b.status) {
        return a.status === 'pending' ? -1 : 1;
      }
      // Si es el mismo estado, ordenar por fecha descendente
      return new Date(b.date) - new Date(a.date);
    });
  };

  const incidentesOrdenados = ordenarIncidentes(incidents);

  return (
    student ? (
      <div className="mt-3">
        <h6>Incidentes de {student.lastName} {student.firstName}:</h6>
        {incidentesOrdenados.length > 0 ? (
          <ul className="list-group">
            {incidentesOrdenados.map(incident => (
              <li key={incident.id_incident} className="list-group-item">
                <strong>{typeTranslation[incident.type] || incident.type}:</strong> {incident.description} <br />
                <strong>Estado:</strong> {statusTranslation[incident.status] || incident.status} <br />
                <strong>Fecha de reporte:</strong> {formatDateTime(incident.date)} <br />
                <strong>Profesor:</strong> {professors[incident.id_professor]?.firstName} {professors[incident.id_professor]?.lastName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No hay incidentes registrados.</p>
        )}
      </div>
    ) : null
  );
};

export default ListaIncidentesHistorial;
