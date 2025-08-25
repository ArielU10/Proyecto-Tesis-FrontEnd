import React, { useState, useEffect } from 'react';
import CourseForm from '../../../components/Admin/CourseForm';
import CourseGroup from '../../../components/Admin/CourseManagement/CourseGroup';
import { FaLayerGroup, FaPlus, FaGraduationCap, FaBook } from 'react-icons/fa';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { getAllCourses, deleteCourse } from '../../../services/courseApi';
import '../../../styles/administrative/courseScreen.css';
import { toast } from 'react-toastify';

const CourseScreen = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('❌ Error al obtener cursos:', error);
      toast.error('Error al cargar cursos', { className: 'toast-error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = (level = '') => {
    setEditingCourse(null);
    setSelectedLevel(level);
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setSelectedLevel(course.level || '');
    setShowForm(true);
  };

  const handleDelete = (id) => {
    // Toast personalizado con glassmorphism
    const confirmToast = () => (
      <div className="delete-confirmation-toast">
        <div className="toast-content">
          <AlertTriangle size={20} />
          <div className="toast-text">
            <h4>¿Eliminar curso?</h4>
            <p>Esta acción no se puede deshacer</p>
          </div>
        </div>
        <div className="toast-buttons">
          <button 
            className="confirm-btn" 
            onClick={() => confirmDelete(id)}
            disabled={deletingId === id}
          >
            {deletingId === id ? (
              <Loader2 size={14} className="spinning" />
            ) : (
              "Eliminar"
            )}
          </button>
          <button 
            className="cancel-btn" 
            onClick={() => toast.dismiss()}
          >
            Cancelar
          </button>
        </div>
      </div>
    );

    toast.info(confirmToast, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "toast-glass",
      hideProgressBar: true
    });
  };

  const confirmDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteCourse(id);
      toast.dismiss();
      toast.success(
        <div className="success-toast">
          <CheckCircle size={20} />
          <span>Curso eliminado correctamente</span>
        </div>, 
        { className: 'toast-delete' }
      );
      fetchCourses();
    } catch (err) {
      console.error("❌ Error al eliminar curso:", err);
      toast.error("Error al eliminar el curso", {
        className: 'toast-error'
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCourse(null);
    setSelectedLevel('');
  };

  const handleSaved = () => {
    fetchCourses();
    
  };

  if (loading) {
    return (
      <div className="course-screen">
        <div className="loading-container">
          <div className="loading-content">
            <Loader2 size={40} className="spinning" />
            <p>Cargando cursos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-screen">
      {/* Header mejorado */}
      <div className="course-header">
        <div className="header-content">
          <div className="header-title">
            <FaLayerGroup size={28} />
            <h2>Administración de Cursos</h2>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <FaBook size={16} />
              <span>{courses.length} cursos totales</span>
            </div>
            <div className="stat-item">
              <FaGraduationCap size={16} />
              <span>{new Set(courses.map(c => c.level)).size} niveles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón principal mejorado */}
      <div className="main-add-button">
        <button className="add-btn" onClick={() => handleAddClick()}>
          <FaPlus size={16} />
          Agregar Nuevo Curso
        </button>
      </div>

      {/* Lista de cursos o estado vacío */}
      <div className="course-list">
        {courses.length > 0 ? (
          <CourseGroup
            courses={courses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddClick={handleAddClick}
            deletingId={deletingId}
          />
        ) : (
          <div className="no-courses-state">
            <FaGraduationCap size={64} />
            <h3>No hay cursos disponibles</h3>
            <p>Comienza agregando tu primer curso al sistema</p>
            <button className="add-first-course-btn" onClick={() => handleAddClick()}>
              <FaPlus size={16} />
              Crear Primer Curso
            </button>
          </div>
        )}
      </div>

      {/* Modal mejorado */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CourseForm
              onClose={handleCloseForm}
              onSaved={handleSaved}
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