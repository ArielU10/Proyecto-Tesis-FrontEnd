import React, { useState } from 'react';
import '../../styles/components/userForms.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { updateCourse } from '../../services/courseApi';

const niveles = {
  "Inicial": ["2 años", "3 años", "4 años"],
  "Basica Elemental": ["1ro de Básica", "2do de Básica", "3ro de Básica", "4to de Básica"],
  "Basica Media": ["5to de Básica", "6to de Básica", "7mo de Básica"],
  "Colegio Basica": ["8vo", "9no", "10mo"],
  "Bachillerato": ["1ro Bachillerato", "2do Bachillerato", "3ro Bachillerato"]
};

const CourseForm = ({ onClose, onSaved, editingCourse, defaultLevel = '' }) => {
  const isEditing = Boolean(editingCourse);

  const [formData, setFormData] = useState({
    courseName: editingCourse?.courseName || '',
    level: editingCourse?.level || defaultLevel,
    description: editingCourse?.description || ''
  });

  const [nivelPrincipal, setNivelPrincipal] = useState(editingCourse?.level || defaultLevel);
  const [errores, setErrores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMainLevelChange = (e) => {
    const nivel = e.target.value;
    setNivelPrincipal(nivel);
    setFormData((prev) => ({
      ...prev,
      level: nivel,
      courseName: '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.level) newErrors.level = "Debe seleccionar un nivel educativo.";
    if (!formData.courseName) newErrors.courseName = "Debe seleccionar un grado.";
    if (!formData.description) newErrors.description = "Debe seleccionar un paralelo.";
    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const start = Date.now();

    try {
      if (isEditing) {
        await updateCourse(editingCourse.id_course, formData);
        toast.success("✅ Curso actualizado con éxito", {
          className: 'toast-success'
        });        
      } else {
        await axios.post('http://localhost:3000/api/courses', formData);
        toast.success("✅ Curso registrado con éxito", {
          className: 'toast-success'
        });
        
      }

      const elapsed = Date.now() - start;
      if (elapsed < 500) {
        await new Promise(resolve => setTimeout(resolve, 500 - elapsed));
      }

      if (onSaved) onSaved();
      onClose();
    } catch (error) {
      console.error("❌ Error al guardar curso:", error);
      toast.error("❌ Hubo un error al guardar el curso.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>{isEditing ? "Editar Curso" : "Agregar Curso"}</h2>

      {!isEditing && defaultLevel && (
        <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '1rem' }}>
          Nivel seleccionado automáticamente: <strong>{defaultLevel}</strong>
        </p>
      )}

      <select name="level" value={formData.level} onChange={handleMainLevelChange} required>
        <option value="">-- Selecciona el nivel educativo --</option>
        {Object.keys(niveles).map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      {errores.level && <p className="error-message">{errores.level}</p>}

      <select
        name="courseName"
        value={formData.courseName}
        onChange={handleChange}
        required
        disabled={!nivelPrincipal}
      >
        <option value="">-- Grado del curso --</option>
        {nivelPrincipal &&
          niveles[nivelPrincipal].map((grado) => (
            <option key={grado} value={grado}>{grado}</option>
          ))}
      </select>
      {errores.courseName && <p className="error-message">{errores.courseName}</p>}

      <select
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      >
        <option value="">-- Selecciona un paralelo --</option>
        {['A', 'B', 'C', 'D'].map((paralelo) => (
          <option key={paralelo} value={paralelo}>{paralelo}</option>
        ))}
      </select>
      {errores.description && <p className="error-message">{errores.description}</p>}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? 'btn-loading' : 'btn-guardar'}`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="spinner" />
              {isEditing ? " Actualizando..." : " Creando Curso..."}
            </>
          ) : (
            isEditing ? "Actualizar Curso" : "Guardar Curso"
          )}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="btn btn-cancel"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
