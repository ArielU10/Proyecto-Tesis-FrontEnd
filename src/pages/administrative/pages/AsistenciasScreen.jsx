import React, { useState, useEffect } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import CourseAsistanceCard from '../../../components/Admin/AsistanceManagement/CourseAsistanceCard';
import { getAllCourses } from '../../../services/courseApi';
import '../../../styles/administrative/asistenciaToday.css';

const AsistenciasScreen = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error('❌ Error al obtener cursos:', error);
      }
    };

    fetchCourses();
  }, []);

  // Agrupación por nivel
  const grouped = courses.reduce((acc, course) => {
    const level = course.level || 'Sin nivel';
    if (!acc[level]) acc[level] = [];
    acc[level].push(course);
    return acc;
  }, {});

  const nivelOrden = [
    "Inicial",
    "Basica Elemental",
    "Basica Media",
    "Colegio Basica",
    "Bachillerato"
  ];

  return (
    <div className="course-screen">
      <div className="course-header">
        <h2><FaClipboardList /> Registro de Asistencias Diarias</h2>
      </div>

      <div className="course-list">
        {courses.length > 0 ? (
          <div className="course-group-container">
            {nivelOrden
              .filter(nivel => grouped[nivel])
              .map(level => (
                <div key={level} className="course-level-section">
                  <div className="course-level-title-container">
                    <h3 className="course-level-title">{level}</h3>
                  </div>
                  <div className="course-cards">
                    {grouped[level].map((course) => (
                      <CourseAsistanceCard key={course.id_course} course={course} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="no-courses-message">No hay cursos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default AsistenciasScreen;
