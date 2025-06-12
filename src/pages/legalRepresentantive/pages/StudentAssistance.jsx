import React, { useState, useEffect } from 'react';
import '../../../styles/legalRepresentantive/LegalRepresentantiveHome.css';
import '../../../styles/legalRepresentantive/additionalLegalRepresentativeStyles.css';

const StudentAssistancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('all');

  // Datos de ejemplo
  const students = [
    { id: 1, name: 'Ana María González', grade: '5to A' },
    { id: 2, name: 'Carlos Eduardo López', grade: '3ro B' },
    { id: 3, name: 'María Fernanda Silva', grade: '2do A' }
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const attendanceRecords = [
    {
      id: 1,
      studentId: 1,
      studentName: 'Ana María González',
      grade: '5to A',
      date: '2024-06-12',
      entryTime: '07:45',
      exitTime: '13:30',
      status: 'presente',
      notes: ''
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Carlos Eduardo López',
      grade: '3ro B',
      date: '2024-06-12',
      entryTime: '08:00',
      exitTime: null,
      status: 'presente',
      notes: 'Aún en clases'
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'María Fernanda Silva',
      grade: '2do A',
      date: '2024-06-12',
      entryTime: null,
      exitTime: null,
      status: 'ausente',
      notes: 'Permiso médico'
    }
  ];

  useEffect(() => {
    // Filtrar datos por fecha y estudiante
    let filtered = attendanceRecords.filter(record => record.date === selectedDate);
    
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(record => record.studentId.toString() === selectedStudent);
    }
    
    setAttendanceData(filtered);
  }, [attendanceRecords, selectedDate, selectedStudent]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'presente': return '#4CAF50';
      case 'ausente': return '#f44336';
      case 'tardanza': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'presente': return '✅';
      case 'ausente': return '❌';
      case 'tardanza': return '⏰';
      default: return '❓';
    }
  };

  return (
    <div className="content-container">
      <h1 className="main-title">Control de Asistencia</h1>
      <h2 className="subtitle-1">Seguimiento Diario</h2>

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
            <option value="all">Todos los estudiantes</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="attendance-summary">
        <div className="summary-card">
          <div className="summary-item">
            <span className="summary-label">Presentes:</span>
            <span className="summary-value present">
              {attendanceData.filter(r => r.status === 'presente').length}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Ausentes:</span>
            <span className="summary-value absent">
              {attendanceData.filter(r => r.status === 'ausente').length}
            </span>
          </div>
        </div>
      </div>

      <div className="attendance-list">
        {attendanceData.length === 0 ? (
          <div className="no-data">
            <p>No hay registros para la fecha seleccionada</p>
          </div>
        ) : (
          attendanceData.map(record => (
            <div key={record.id} className="attendance-card">
              <div className="attendance-header">
                <div className="student-info">
                  <h3 className="student-name">{record.studentName}</h3>
                  <p className="student-grade">{record.grade}</p>
                </div>
                <div className="status-indicator" style={{ color: getStatusColor(record.status) }}>
                  {getStatusIcon(record.status)} {record.status.toUpperCase()}
                </div>
              </div>
              
              <div className="attendance-details">
                <div className="time-info">
                  <div className="time-item">
                    <span className="time-label">Entrada:</span>
                    <span className="time-value">
                      {record.entryTime || '--:--'}
                    </span>
                  </div>
                  <div className="time-item">
                    <span className="time-label">Salida:</span>
                    <span className="time-value">
                      {record.exitTime || '--:--'}
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
          <p>• Para reportar ausencias justificadas, contacte a la institución</p>
        </div>
      </div>
    </div>
  );
};

export default StudentAssistancePage;