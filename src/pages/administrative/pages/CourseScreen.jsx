import React, { useState, useEffect } from 'react';
import CourseForm from '../../../components/Admin/CourseForm';
import CourseGroup from '../../../components/Admin/CourseGroup';
import { getCourses, deleteCourse } from '../../../services/courseApi';
import '../../../styles/administrative/courseScreen.css';

const CourseScreen = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error('❌ Error al obtener cursos:', error);
    }
  };

  const handleAddClick = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este curso?')) {
      try {
        await deleteCourse(id);
        await fetchCourses();
        alert('✅ Curso eliminado');
      } catch (err) {
        console.error('❌ Error al eliminar curso:', err);
        alert('Error al eliminar curso');
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  return (
    <div className="course-screen">
      <div className="course-header">
        <h2>Cursos / Paralelos</h2>
        <button className="add-btn" onClick={handleAddClick}>
          + Agregar Curso
        </button>
      </div>

      <div className="course-list">
        <CourseGroup
          courses={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CourseForm
              onClose={handleCloseForm}
              onSaved={fetchCourses}
              editingCourse={editingCourse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseScreen;
