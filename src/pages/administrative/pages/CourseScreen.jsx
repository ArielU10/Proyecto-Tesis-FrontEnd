import React, { useState, useEffect } from 'react';
import CourseForm from '../../../components/Admin/CourseForm';
import CourseGroup from '../../../components/Admin/CourseGroup';
import { FaLayerGroup } from 'react-icons/fa';
import { getCourses, deleteCourse } from '../../../services/courseApi';
import '../../../styles/administrative/courseScreen.css';
import { toast } from 'react-toastify';

const CourseScreen = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('');

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

  const handleAddClick = (level = '') => {
    setEditingCourse(null);
    setSelectedLevel(level); // ✅ capturamos nivel
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setSelectedLevel(course.level || '');
    setShowForm(true);
  };

  const handleDelete = (id) => {
    toast.info(
      <div>
        ¿Estás seguro de eliminar este curso?
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="btn" onClick={() => confirmDelete(id)}>Sí</button>
          <button className="btn btn-cancel" onClick={() => toast.dismiss()}>Cancelar</button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        className: "toast-glass" 
      }
    );
  };

  const confirmDelete = async (id) => {
    try {
      await deleteCourse(id);
      toast.dismiss();
      toast.success("🗑️ Curso eliminado correctamente", { className: 'toast-success' });
      fetchCourses();
    } catch (err) {
      console.error("❌ Error al eliminar curso:", err);
      toast.error("❌ Hubo un error al eliminar el curso");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCourse(null);
    setSelectedLevel('');
  };

  return (
    <div className="course-screen">
      <div className="course-header">
      <h2><FaLayerGroup /> Administracion de Cursos</h2>
      </div>

      <div className="course-list">
        <CourseGroup
          courses={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddClick={handleAddClick}
        />
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CourseForm
              onClose={handleCloseForm}
              onSaved={fetchCourses}
              editingCourse={editingCourse}
              defaultLevel={selectedLevel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseScreen;
