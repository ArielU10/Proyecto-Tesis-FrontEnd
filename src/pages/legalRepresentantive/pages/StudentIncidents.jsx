/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/legalRepresentantive/LegalRepresentantiveHome.css';
import '../../../styles/legalRepresentantive/additionalLegalRepresentativeStyles.css';

const StudentIncidentsPage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const token = user?.token || localStorage.getItem('token');
  const roleId = user?.user?.roleId;

  useEffect(() => {
    if (roleId && token) fetchStudents();
  }, [roleId, token]);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/legal-representatives/${roleId}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Error cargando estudiantes:', err);
      setError('No se pudieron cargar los estudiantes');
    }
  };

  useEffect(() => {
    if (selectedStudent) fetchIncidents();
  }, [selectedStudent]);

  const fetchIncidents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:3000/api/legal-representatives/${roleId}/estudiantes/${selectedStudent}/incidencias`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setIncidents(data);
    } catch (err) {
      console.error('Error al obtener incidentes:', err);
      setError('No se pudieron cargar los incidentes');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'leve': return '#4CAF50';
      case 'moderado': return '#FF9800';
      case 'alto': return '#f44336';
      default: return '#9E9E9E';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'académico': return '📚';
      case 'disciplinario': return '⚠️';
      case 'médico': return '🏥';
      case 'seguridad': return '🛡️';
      default: return '📝';
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pendiente': { color: '#FF9800', text: 'Pendiente' },
      'revisado': { color: '#2196F3', text: 'Revisado' },
      'atendido': { color: '#4CAF50', text: 'Atendido' },
      'cerrado': { color: '#9E9E9E', text: 'Cerrado' }
    };

    const badge = badges[status] || badges['pendiente'];
    return (
      <span className="status-badge" style={{ backgroundColor: badge.color }}>
        {badge.text}
      </span>
    );
  };

  return (
    <div className="content-container">
      <h1 className="main-title">Gestión de Incidentes</h1>
      <h2 className="subtitle-1">Reportes y Seguimiento</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="filters-section">
        <div className="filter-group">
          <label className="form-label">Seleccionar Estudiante:</label>
          <select
            className="form-select"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Seleccione un estudiante --</option>
            {students.map(s => (
              <option key={s.id_student || s.id} value={s.id_student || s.id}>
                {s.first_name} {s.last_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          📋 Lista de Incidentes
        </button>
        <button
          className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          ➕ Reportar Incidente
        </button>
      </div>

      {activeTab === 'list' && (
        <div className="incidents-list">
          {loading ? (
            <p>Cargando incidentes...</p>
          ) : incidents.length === 0 ? (
            <p>No hay incidentes registrados para este estudiante</p>
          ) : (
            incidents.map((incident, index) => (
              <div key={index} className="incident-card">
                <div className="incident-header">
                  <div className="incident-type">
                    {getTypeIcon(incident.type)} {incident.type?.toUpperCase()}
                  </div>
                  {getStatusBadge(incident.status)}
                </div>

                <h3 className="incident-title">{incident.title || 'Sin título'}</h3>

                <div className="incident-meta">
                  <p><strong>Fecha:</strong> {incident.date} a las {incident.time}</p>
                  {incident.teacher && <p><strong>Docente:</strong> {incident.teacher}</p>}
                </div>

                <div className="incident-description">
                  <p><strong>Descripción:</strong></p>
                  <p>{incident.description}</p>
                </div>

                <div className="severity-indicator">
                  <span
                    className="severity-badge"
                    style={{ backgroundColor: getSeverityColor(incident.severity) }}
                  >
                    Severidad: {incident.severity?.toUpperCase()}
                  </span>
                </div>

                {incident.response && (
                  <div className="incident-response">
                    <p><strong>Respuesta institucional:</strong></p>
                    <p>{incident.response}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'report' && (
        <div className="report-form">
          <p>🚧 Este formulario es informativo. Para habilitarlo se necesita un endpoint `POST /incidencias`.</p>
          <div className="info-section">
            <h4 className="info-title">Información Importante</h4>
            <div className="info-card">
              <p>• Los incidentes son revisados por el personal educativo</p>
              <p>• Recibirá una respuesta en un plazo máximo de 48 horas</p>
              <p>• Para emergencias médicas, contacte directamente a la institución</p>
              <p>• Sea específico y objetivo en la descripción</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentIncidentsPage;
