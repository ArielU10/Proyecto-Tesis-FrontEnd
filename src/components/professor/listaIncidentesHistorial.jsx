import React from "react";

const ListaIncidentesHistorial = ({ student, incidents }) => (
  student ? (
    <div>
      <h6>Incidentes de {student.firstName}:</h6>
      {incidents.length > 0 ? (
        <ul className="list-group">
          {incidents.map(incident => (
            <li key={incident.id_incident} className="list-group-item">
              <strong>{incident.type}</strong>: {incident.description}<br />
              Estado: {incident.status}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No hay incidentes registrados.</p>
      )}
    </div>
  ) : null
);

export default ListaIncidentesHistorial;
