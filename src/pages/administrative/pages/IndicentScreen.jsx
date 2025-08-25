import React, { useEffect, useState } from "react";
import { getAllIncidents } from "../../../services/incidentApi";
import UserCard from "../../../components/Admin/UserManagement/UserCard";
import "../../../styles/components/userManagement/userCard.css";
import ModalSeguimiento from '../../../components/professor/modalSeguimiento';

const IncidentScreen = () => {
    const [incidents, setIncidents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
  
    const fetchAllIncidents = async () => {
      setLoading(true);
      try {
        const data = await getAllIncidents(); // ✅ Cambio: ahora usa getAllIncidents
        console.log('Datos de incidentes:', data); // Para debugging
        setIncidents(data);
      } catch (error) {
        console.error('Error al obtener todos los incidentes:', error);
        setIncidents([]);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchAllIncidents();
    }, []);
  
    // ✅ Nuevo: Función para extraer estudiantes únicos con sus incidentes
    const getStudentsWithIncidents = () => {
      if (!incidents || incidents.length === 0) return [];
      
      const studentsMap = new Map();
      
      incidents.forEach(incident => {
        // Asumiendo que el incidente trae datos del estudiante (Student)
        if (incident.Student) {
          const studentId = incident.Student.id_student;
          
          if (studentsMap.has(studentId)) {
            // Si ya existe, agregar este incidente
            studentsMap.get(studentId).incidents.push(incident);
          } else {
            // Crear nueva entrada para el estudiante
            studentsMap.set(studentId, {
              ...incident.Student, // Datos del estudiante
              incidents: [incident], // Array de incidentes
              totalIncidents: 1,
              pendingIncidents: incident.status === 'pending' ? 1 : 0
            });
          }
        }
      });
      
      // Convertir Map a Array y agregar estadísticas
      return Array.from(studentsMap.values()).map(student => ({
        ...student,
        totalIncidents: student.incidents.length,
        pendingIncidents: student.incidents.filter(inc => inc.status === 'pending').length,
        resolvedIncidents: student.incidents.filter(inc => inc.status === 'resolved').length,
        lastIncidentDate: Math.max(...student.incidents.map(inc => new Date(inc.createdAt).getTime()))
      }));
    };

    const studentsWithIncidents = getStudentsWithIncidents();
  
    const handleView = (student) => {
      // ✅ Ahora el estudiante incluye sus incidentes
      setSelectedStudent(student);
      setShowModal(true);
    };

    if (loading) {
      return (
        <div className="course-screen">
          <div className="course-header">
            <h2>Faltas y Observaciones</h2>
            <p>Cargando incidentes...</p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="course-screen">
        <div className="course-header">
          <h2>Faltas y Observaciones</h2>
          <p>
            {studentsWithIncidents.length > 0 
              ? `${studentsWithIncidents.length} estudiantes con incidentes registrados`
              : "No hay incidentes registrados"
            }
          </p>
          
          {/* ✅ Nuevo: Estadísticas generales */}
          {incidents.length > 0 && (
            <div className="stats-summary">
              <div className="stat-item">
                <span className="stat-number">{incidents.length}</span>
                <span className="stat-label">Total Incidentes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {incidents.filter(inc => inc.status === 'pending').length}
                </span>
                <span className="stat-label">Pendientes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {incidents.filter(inc => inc.status === 'resolved').length}
                </span>
                <span className="stat-label">Resueltos</span>
              </div>
            </div>
          )}
        </div>
  
        {studentsWithIncidents.length > 0 ? (
          <div className="course-cards">
            {studentsWithIncidents
              .sort((a, b) => b.pendingIncidents - a.pendingIncidents) // Ordenar por incidentes pendientes
              .map((student) => (
                <UserCard
                  key={student.id_student}
                  user={student}
                  onView={() => handleView(student)}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  // ✅ Nuevo: Props adicionales para mostrar estadísticas
                  additionalInfo={{
                    totalIncidents: student.totalIncidents,
                    pendingIncidents: student.pendingIncidents,
                    resolvedIncidents: student.resolvedIncidents,
                    lastIncidentDate: new Date(student.lastIncidentDate).toLocaleDateString()
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="no-courses-message">
            <h3>No hay incidentes registrados</h3>
            <p>Cuando se registren incidentes, aparecerán aquí.</p>
          </div>
        )}
  
        {selectedStudent && (
          <ModalSeguimiento
            show={showModal}
            onHide={() => setShowModal(false)}
            student={selectedStudent}
            onFollowUpUpdated={fetchAllIncidents} // ✅ Cambio: actualizar todos los incidentes
            // ✅ Nuevo: Pasar los incidentes del estudiante al modal
            studentIncidents={selectedStudent.incidents}
          />
        )}
      </div>
    );
  };
  
  export default IncidentScreen;