import React, { useState } from "react";
import {
  FaUserMd,
  FaShieldAlt,
  FaExclamationTriangle,
  FaBook
} from "react-icons/fa";

const ListaEstudiantesHistorial = ({ studentsWithIncidents }) => {
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const handleToggle = (id_student) => {
    setExpandedStudentId((prev) => (prev === id_student ? null : id_student));
  };

  const incidentTypeMap = {
    medical: { label: "Médico", icon: <FaUserMd style={{ color: "#007bff" }} /> },
    disciplinary: { label: "Disciplinario", icon: <FaExclamationTriangle style={{ color: "#dc3545" }} /> },
    security: { label: "Seguridad", icon: <FaShieldAlt style={{ color: "#ffc107" }} /> },
    academic: { label: "Académico", icon: <FaBook style={{ color: "#17a2b8" }} /> }
  };

  const sorted = [...studentsWithIncidents].sort((a, b) => {
    const last = a.student.lastName.localeCompare(b.student.lastName);
    if (last !== 0) return last;
    return a.student.firstName.localeCompare(b.student.firstName);
  });

  return (
    <div className="lista-estudiantes">
      {sorted.map(({ student, incidents }) => (
        <div key={student.id_student} className="estudiante-item">
          <div
            className="estudiante-nombre"
            onClick={() => handleToggle(student.id_student)}
            style={{
              fontWeight: "bold",
              color: "#2c3e50",
              cursor: "pointer",
              marginBottom: "5px"
            }}
          >
            {student.lastName} {student.firstName}
          </div>

          {expandedStudentId === student.id_student && (
            <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
              <ul>
                {incidents.map((inc) => {
                  const { label, icon } = incidentTypeMap[inc.type] || {
                    label: inc.type,
                    icon: "❗"
                  };
                  const formattedDate = new Date(inc.date).toLocaleDateString();

                  return (
                    <li key={inc.id_incident} className="tarjeta-incidente">
                      <div>
                        {icon} {label} - <span className="fecha">{formattedDate}</span>
                      </div>
                      <div className="contenido">
                        <p><strong>Descripción:</strong> {inc.description}</p>
                        {inc.status === "resolved" && inc.resolution && (
                          <p className="resuelto"><strong>Resuelto:</strong> {inc.resolution}</p>
                        )}
                        {inc.status === "pending" && (
                          <p className="pendiente"><strong>Resolución pendiente</strong></p>
                        )}
                      </div>
                    </li>

                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListaEstudiantesHistorial;
