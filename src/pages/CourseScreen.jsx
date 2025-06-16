import React, { useState, useEffect } from 'react';
import CourseForm from '../components/Admin/CourseForm';
import { getCourses } from "../services/courseApi";
import '../styles/administrative/courseScreen.css'; // si usas uno dedicado

const CourseScreen = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

  const handleAddClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="course-screen">
      <div className="course-header">
        <h2>Cursos / Paralelos</h2>
        <button className="add-btn" onClick={handleAddClick}>+ Agregar Curso</button>
      </div>

      <div className="course-table">
        <table>
          <thead>
            <tr>
              <th>Grado</th>
              <th>Nivel</th>
              <th>Paralelo</th>
              {/* <th>Acciones</th> (para futuro) */}
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseName}</td>
                  <td>{course.level}</td>
                  <td>{course.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No hay cursos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CourseForm onClose={handleCloseForm} onSaved={fetchCourses} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseScreen;
