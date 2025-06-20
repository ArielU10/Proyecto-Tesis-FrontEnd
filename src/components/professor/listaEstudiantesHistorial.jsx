import React, { useState } from "react";
import {
  FaUserMd,
  FaShieldAlt,
  FaExclamationTriangle,
  FaBook 
} from "react-icons/fa";

const ListaEstudiantesHistorial = ({ students, getIncidentsByStudentId }) => {
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [incidentsMap, setIncidentsMap] = useState({});

  const handleToggle = async (student) => {
    const id = student.id_student;

    if (expandedStudentId === id) {
      setExpandedStudentId(null);
    } else {
      if (!incidentsMap[id]) {
        const data = await getIncidentsByStudentId(id);
        setIncidentsMap((prev) => ({ ...prev, [id]: data }));
      }
      setExpandedStudentId(id);
    }
  };

  const incidentTypeMap = {
    medical: {
      label: "Médico",
      icon: <FaUserMd style={{ color: "#007bff" }} />
    },
    disciplinary: {
      label: "Disciplinario",
      icon: <FaExclamationTriangle style={{ color: "#dc3545" }} />
    },
    security: {
      label: "Seguridad",
      icon: <FaShieldAlt style={{ color: "#ffc107" }} />
    },
    academic: {
      label: "Académico",
      icon: <FaBook style={{ color: "#17a2b8" }}/>
    }
  };

  // Ordenar estudiantes por apellido y luego nombre
  const sortedStudents = [...students].sort((a, b) => {
    const last = a.lastName.localeCompare(b.lastName);
    if (last !== 0) return last;
    return a.firstName.localeCompare(b.firstName);
  });

  return (
    <div className="lista-estudiantes">
      {sortedStudents.map((student) => (
        <div key={student.id_student} className="estudiante-item">
          <div
            className="estudiante-nombre"
            onClick={() => handleToggle(student)}
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
            <div
              className="incidentes-desplegados"
              style={{ marginLeft: "20px", marginBottom: "15px" }}
            >
              {incidentsMap[student.id_student]?.length === 0 ? (
                <p style={{ color: "gray" }}>Sin incidentes</p>
              ) : (
                <ul>
                  {incidentsMap[student.id_student].map((inc) => {
                    const { label, icon } =
                      incidentTypeMap[inc.type] || { label: inc.type, icon: "❗" };
                    return (
                      <li key={inc.id_incident}>
                        <strong>
                          {icon} {label}
                        </strong>{" "}
                        - {inc.description}{" "}
                        <em>({new Date(inc.date).toLocaleDateString()})</em>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListaEstudiantesHistorial;
