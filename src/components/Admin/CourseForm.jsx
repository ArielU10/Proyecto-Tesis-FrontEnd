// src/components/Admin/CourseForm.jsx
import React, { useState } from 'react';
import '../../styles/components/courseForm.css';
import axios from 'axios';

const niveles = {
  "Inicial": ["2 años", "3 años", "4 años"],
  "Basica Elemental": ["1ro de Básica", "2do de Básica", "3ro de Básica", "4to de Básica"],
  "Basica Media": ["5to de Básica", "6to de Básica", "7mo de Básica"],
  "Colegio Basica": ["8vo", "9no", "10mo"],
  "Bachillerato": ["1ro Bachillerato", "2do Bachillerato", "3ro Bachillerato"]
};

const CourseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    level: '',
    description: ''
  });

  const [nivelPrincipal, setNivelPrincipal] = useState('');
  const [errores, setErrores] = useState({});

  const handleMainLevelChange = (e) => {
    const nivel = e.target.value;
    setNivelPrincipal(nivel);
    setFormData((prev) => ({
      ...prev,
      level: nivel,
      courseName: '', // reset grado al cambiar nivel
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

    try {
      await axios.post('http://localhost:3000/api/courses', formData);
      alert("✅ Curso registrado con éxito");
      onClose();
    } catch (error) {
      console.error("❌ Error al guardar curso:", error);
      alert("Hubo un error al guardar el curso.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Agregar Curso</h2>

      {/* Nivel Educativo */}
      <select name="level" value={formData.level} onChange={handleMainLevelChange} required>
        <option value="">-- Selecciona el nivel educativo --</option>
        {Object.keys(niveles).map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      {errores.level && <p className="error-message">{errores.level}</p>}

      {/* Grado del curso */}
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

      {/* Paralelo */}
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

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
};

export default CourseForm;
