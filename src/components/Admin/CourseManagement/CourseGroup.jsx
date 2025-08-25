import React from 'react';
import { FaEdit, FaTrash, FaBook, FaGraduationCap, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import '../../../styles/administrative/courseGroup.css';

const CourseGroup = ({ courses, onEdit, onDelete, onAddClick, deletingId }) => {
  const grouped = courses.reduce((acc, course) => {
    const level = course.level || 'Sin nivel';
    if (!acc[level]) acc[level] = [];
    acc[level].push(course);
    return acc;
  }, {});

  // Definir jerarquía deseada con iconos y colores
  const nivelOrden = [
    {
      name: "Inicial",
      emoji: "🧒",
      color: "inicial",
      description: "Educación inicial y preescolar"
    },
    {
      name: "Basica Elemental",
      emoji: "📚",
      color: "elemental",
      description: "Primeros años de educación básica"
    },
    {
      name: "Basica Media",
      emoji: "📖",
      color: "media",
      description: "Educación básica intermedia"
    },
    {
      name: "Colegio Basica",
      emoji: "🎓",
      color: "colegio",
      description: "Educación básica superior"
    },
    {
      name: "Bachillerato",
      emoji: "🎯",
      color: "bachillerato",
      description: "Educación media superior"
    }
  ];

  // Función mejorada de ordenamiento
  const sortCourses = (a, b) => {
    // Primero por número de grado
    const numA = parseInt(a.courseName.match(/\d+/)) || 0;
    const numB = parseInt(b.courseName.match(/\d+/)) || 0;
    if (numA !== numB) return numA - numB;
    
    // Luego por paralelo alfabéticamente
    return a.description.localeCompare(b.description);
  };

  // Función para obtener el nivel con metadata
  const getLevelData = (levelName) => {
    return nivelOrden.find(nivel => nivel.name === levelName) || {
      name: levelName,
      emoji: "📋",
      color: "default",
      description: "Nivel educativo"
    };
  };

  return (
    <div className="course-group-container">
      {nivelOrden
        .filter(nivel => grouped[nivel.name]) // solo niveles existentes
        .map(levelData => {
          const level = levelData.name;
          const coursesInLevel = grouped[level];
          
          return (
            <div key={level} className={`course-level-section level-${levelData.color}`}>
              {/* Header mejorado del nivel */}
              <div className="course-level-header">
                <div className="level-info">
                  <div className="level-icon">
                    <span className="level-emoji">{levelData.emoji}</span>
                  </div>
                  <div className="level-details">
                    <h3 className="course-level-title">{level}</h3>
                    <p className="level-description">{levelData.description}</p>
                    <div className="level-stats">
                      <span className="course-count">{coursesInLevel.length} curso{coursesInLevel.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="plus-btn" 
                  title={`Agregar curso en ${level}`} 
                  onClick={() => onAddClick(level)}
                >
                  <MdAddCircle />
                  <span>Agregar</span>
                </button>
              </div>

              {/* Grid de cursos mejorado */}
              <div className="course-cards">
                {coursesInLevel.sort(sortCourses).map(course => (
                  <div key={course.id_course} className="course-card">
                    {/* Header de la tarjeta */}
                    <div className="course-card-header">
                      <div className="course-icon">
                        <FaBook />
                      </div>
                      <div className="course-title-section">
                        <h4 className="course-title">{course.courseName}</h4>
                        <span className="course-subtitle">Paralelo {course.description}</span>
                      </div>
                    </div>

                    {/* Información detallada */}
                    <div className="course-details">
                      <div className="detail-item">
                        <FaGraduationCap className="detail-icon" />
                        <div className="detail-content">
                          <span className="detail-label">Nivel</span>
                          <span className="detail-value">{level}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <FaChalkboardTeacher className="detail-icon" />
                        <div className="detail-content">
                          <span className="detail-label">Grado</span>
                          <span className="detail-value">{course.courseName}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <FaUsers className="detail-icon" />
                        <div className="detail-content">
                          <span className="detail-label">Paralelo</span>
                          <span className="detail-value">{course.description}</span>
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="course-actions">
                      <button 
                        onClick={() => onEdit(course)} 
                        className="edit-btn"
                        title="Editar curso"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => onDelete(course.id_course)} 
                        className="delete-btn"
                        disabled={deletingId === course.id_course}
                        title="Eliminar curso"
                      >
                        {deletingId === course.id_course ? (
                          <div className="loading-spinner"></div>
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CourseGroup;