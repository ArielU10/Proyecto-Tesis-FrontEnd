/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import "../../../styles/legalRepresentantive/LegalRepresentantiveHome.css";
import "../../../styles/legalRepresentantive/additionalLegalRepresentativeStyles.css";

const StudentAssistancePage = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const token = user?.token || localStorage.getItem("token");
  const roleId = user?.user?.roleId;

  useEffect(() => {
    if (roleId && token) {
      fetchStudents();
    }
  }, [roleId, token]);

  const fetchStudents = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/legal-representatives/${roleId}/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error cargando estudiantes:", err);
      setError("No se pudieron cargar los estudiantes");
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      fetchAttendance();
    }
  }, [selectedStudent]);

  const fetchAttendance = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/legal-representatives/${roleId}/estudiantes/${selectedStudent}/asistencias`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setAttendanceData(data);
    } catch (err) {
      console.error("Error obteniendo asistencia:", err);
      setError("No se pudo obtener la asistencia del estudiante");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "presente":
        return "#4CAF50";
      case "ausente":
        return "#f44336";
      case "tardanza":
        return "#FF9800";
      default:
        return "#9E9E9E";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "presente":
        return "✅";
      case "ausente":
        return "❌";
      case "tardanza":
        return "⏰";
      default:
        return "❓";
    }
  };

  const filteredAttendance = attendanceData.filter(
    (r) => new Date(r.date).toISOString().split("T")[0] === selectedDate
  );

  return (
    <div className="content-container">
      <h1 className="main-title">Control de Asistencia</h1>
      <h2 className="subtitle-1">Seguimiento Diario</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="filters-section">
        <div className="filter-group">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-input"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label className="form-label">Estudiante:</label>
          <select
            className="form-select"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Seleccione un estudiante --</option>
            {students.map((s) => (
              <option key={s.id_student || s.id} value={s.id_student || s.id}>
                {s.first_name} {s.last_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="attendance-list">
        {attendanceData.length === 0 ? (
          <div className="no-data">
            <p>Este estudiante no tiene registros de asistencia.</p>
          </div>
        ) : filteredAttendance.length === 0 ? (
          <div className="no-data">
            <p>
              No hay asistencia registrada para la fecha seleccionada (
              {selectedDate}).
            </p>
          </div>
        ) : (
          filteredAttendance.map((record) => (
            <div key={record.id} className="attendance-card">
              <div className="attendance-header">
                <div className="student-info">
                  <h3 className="student-name">
                    {
                      students.find(
                        (s) => s.id_student.toString() === selectedStudent
                      )?.first_name
                    }{" "}
                    {
                      students.find(
                        (s) => s.id_student.toString() === selectedStudent
                      )?.last_name
                    }
                  </h3>
                  <p className="student-grade">
                    Grado:{" "}
                    {students.find(
                      (s) => s.id_student.toString() === selectedStudent
                    )?.grade || "N/A"}
                  </p>
                </div>
                <div
                  className="status-indicator"
                  style={{ color: getStatusColor(record.status) }}
                >
                  {getStatusIcon(record.status)} {record.status?.toUpperCase()}
                </div>
              </div>

              <div className="attendance-details">
                <div className="time-info">
                  <div className="time-item">
                    <span className="time-label">Fecha:</span>
                    <span className="time-value">
                      {new Date(record.date).toLocaleDateString("es-EC")}
                    </span>
                  </div>
                  <div className="time-item">
                    <span className="time-label">Docente:</span>
                    <span className="time-value">
                      {record.professor || "No asignado"}
                    </span>
                  </div>
                  <div className="time-item">
                    <span className="time-label">Justificación:</span>
                    <span className="time-value">
                      {record.justification || "Sin justificación"}
                    </span>
                  </div>
                </div>

                {record.notes && (
                  <div className="notes-section">
                    <p className="notes-label">Observaciones:</p>
                    <p className="notes-text">{record.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="info-section">
        <h4 className="info-title">Información</h4>
        <div className="info-card">
          <p>• Los registros se actualizan en tiempo real</p>
          <p>• Horario de entrada: 07:30 - 08:00</p>
          <p>• Horario de salida: 13:00 - 13:30</p>
          <p>
            • Para reportar ausencias justificadas, contacte a la institución
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAssistancePage;
