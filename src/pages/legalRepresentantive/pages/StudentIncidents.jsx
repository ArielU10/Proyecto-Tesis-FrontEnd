import React, { useState } from 'react';
import '../../../styles/legalRepresentantive/LegalRepresentantiveHome.css';
import '../../../styles/legalRepresentantive/additionalLegalRepresentativeStyles.css';

const StudentIncidentsPage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      studentName: 'Ana María González',
      grade: '5to A',
      type: 'académico',
      severity: 'leve',
      title: 'Tarea no entregada',
      description: 'No entregó la tarea de matemáticas del día anterior',
      date: '2024-06-11',
      time: '10:30',
      teacher: 'Prof. García',
      status: 'revisado',
      response: 'Justificado por enfermedad'
    },
    {
      id: 2,
      studentName: 'Carlos Eduardo López',
      grade: '3ro B',
      type: 'disciplinario',
      severity: 'moderado',
      title: 'Comportamiento inadecuado',
      description: 'Interrumpió la clase repetidamente y no siguió las instrucciones del docente',
      date: '2024-06-10',
      time: '14:15',
      teacher: 'Prof. Martínez',
      status: 'pendiente',
      response: ''
    },
    {
      id: 3,
      studentName: 'María Fernanda Silva',
      grade: '2do A',
      type: 'médico',
      severity: 'alto',
      title: 'Malestar durante educación física',
      description: 'Presentó mareos y náuseas durante la clase de educación física',
      date: '2024-06-12',
      time: '11:00',
      teacher: 'Prof. Rodríguez',
      status: 'atendido',
      response: 'Se contactó a los padres, estudiante enviada a enfermería'
    }
  ]);

  const [newIncident, setNewIncident] = useState({
    type: '',
    title: '',
    description: ''
  });

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
      <span 
        className="status-badge" 
        style={{ backgroundColor: badge.color }}
      >
        {badge.text}
      </span>
    );
  };

  const handleSubmitIncident = (e) => {
    e.preventDefault();
    if (!newIncident.type || !newIncident.title || !newIncident.description) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const incident = {
      id: incidents.length + 1,
      ...newIncident,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      status: 'pendiente',
      severity: 'moderado',
      response: ''
    };

    setIncidents([incident, ...incidents]);
    setNewIncident({ type: '', title: '', description: '' });
    setActiveTab('list');
    alert('Incidente reportado exitosamente');
  };

  return (
    <div className="content-container">
      <h1 className="main-title">Gestión de Incidentes</h1>
      <h2 className="subtitle-1">Reportes y Seguimiento</h2>

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
          <div className="incidents-summary">
            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-label">Total:</span>
                <span className="summary-value">{incidents.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Pendientes:</span>
                <span className="summary-value pending">
                  {incidents.filter(i => i.status === 'pendiente').length}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Atendidos:</span>
                <span className="summary-value resolved">
                  {incidents.filter(i => i.status === 'atendido').length}
                </span>
              </div>
            </div>
          </div>

          {incidents.map(incident => (
            <div key={incident.id} className="incident-card">
              <div className="incident-header">
                <div className="incident-type">
                  {getTypeIcon(incident.type)} {incident.type.toUpperCase()}
                </div>
                {getStatusBadge(incident.status)}
              </div>
              
              <h3 className="incident-title">{incident.title}</h3>
              
              <div className="incident-meta">
                <p><strong>Estudiante:</strong> {incident.studentName} - {incident.grade}</p>
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
                  Severidad: {incident.severity.toUpperCase()}
                </span>
              </div>

              {incident.response && (
                <div className="incident-response">
                  <p><strong>Respuesta institucional:</strong></p>
                  <p>{incident.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'report' && (
        <div className="report-form">
          <form onSubmit={handleSubmitIncident}>
            <div className="form-group">
              <label className="form-label">Tipo de Incidente *</label>
              <select
                className="form-select"
                value={newIncident.type}
                onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="académico">📚 Académico</option>
                <option value="disciplinario">⚠️ Disciplinario</option>
                <option value="médico">🏥 Médico</option>
                <option value="seguridad">🛡️ Seguridad</option>
                <option value="otro">📝 Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Título del Incidente *</label>
              <input
                type="text"
                className="form-input"
                value={newIncident.title}
                onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                placeholder="Ej: Problema en el recreo"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Descripción Detallada *</label>
              <textarea
                className="form-textarea"
                rows="4"
                value={newIncident.description}
                onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                placeholder="Describa detalladamente lo ocurrido..."
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              📤 Enviar Reporte
            </button>
          </form>

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