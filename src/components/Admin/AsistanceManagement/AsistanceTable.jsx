import React from "react";

const AsistanceTable = ({ asistencias }) => {
  return (
    <table className="asistencias-table">
      <thead>
        <tr>
          <th>Estudiante</th>
          <th>Estado</th>
          <th>Justificación</th>
          <th>Hora</th>
        </tr>
      </thead>
      <tbody>
        {asistencias.map((a) => (
          <tr key={a.id_asistance}>
            <td>{a.Student?.firstName} {a.Student?.lastName}</td>
            <td className={a.status}>
              {a.status === "late" ? "🕐 Atraso" : "❌ Falta"}
            </td>
            <td>{a.justification || "—"}</td>
            <td>{new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AsistanceTable;
