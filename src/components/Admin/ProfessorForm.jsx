import React, { useState, useEffect } from 'react';
import '../../styles/components/userForms.css';
import {
  validateCedula,
  validatePhone,
  handleLetterInput,
  handleUppercaseChange,
  validateEmail
} from '../../services/validationService';
import { getCourses } from '../../services/courseApi';
import Select from 'react-select';
import { FaSpinner } from 'react-icons/fa';

const ProfessorForm = ({ formData, onChange, onSubmit, onCancel, isSubmitting }) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');

  const niveles = [
    'Inicial',
    'Basica Elemental',
    'Basica Media',
    'Colegio Basica',
    'Bachillerato'
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      const allCourses = await getCourses();
      setCourses(allCourses);
    };
    fetchCourses();
  }, []);

  const selectedCourseObjects = (formData.courseIds || []).map(id => {
    const course = courses.find(c => c.id_course === id);
    return course ? {
      value: course.id_course,
      label: `${course.courseName} - ${course.description}`
    } : null;
  }).filter(Boolean);

  const filteredCourses = selectedLevel
    ? courses.filter(course => course.level === selectedLevel && !formData.courseIds?.includes(course.id_course))
    : courses.filter(course => !formData.courseIds?.includes(course.id_course));

  const filteredOptions = filteredCourses.map(course => ({
    value: course.id_course,
    label: `${course.courseName} - ${course.description}`
  }));

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>Datos del Profesor</h2>

      <input
        type="text"
        name="firstName"
        placeholder="Nombres"
        value={formData.firstName}
        onKeyPress={handleLetterInput}
        onChange={(e) => handleUppercaseChange(e, onChange)}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Apellidos"
        value={formData.lastName}
        onKeyPress={handleLetterInput}
        onChange={(e) => handleUppercaseChange(e, onChange)}
        required
      />

      <input
        className="full-width"
        type="text"
        name="identification"
        placeholder="Cédula o Identificación"
        value={formData.identification}
        onChange={onChange}
        onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
        onBlur={() => {
          const isValid = validateCedula(formData.identification);
          setErrors((prev) => ({
            ...prev,
            identification: isValid ? '' : 'Cédula de identidad no válida'
          }));
        }}
        maxLength={10}
        required
      />
      {errors.identification && <p className="error-message full-width">{errors.identification}</p>}


      <input
        className="full-width"
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={onChange}
        onBlur={() => {
          const isValid = validateEmail(formData.email);
          setErrors((prev) => ({
            ...prev,
            email: isValid ? '' : 'Correo electrónico no válido'
          }));
        }}
        required
      />
      {errors.email && <p className="error-message full-width">{errors.email}</p>}


      <div className="full-width" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ whiteSpace: 'nowrap' }}>+593</span>
        <input
          type="text"
          name="phone"
          placeholder="Ej: 998000597"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,9}$/.test(value)) {
              onChange({ target: { name: 'phone', value } });
            }
          }}
          onBlur={() => {
            if (formData.phone) {
              const isValid = validatePhone(formData.phone);
              setErrors((prev) => ({
                ...prev,
                phone: isValid ? '' : 'Número incorrecto (debe contener 9 dígitos)'
              }));
            }
          }}
          maxLength={9}
        />
      </div>
      {errors.phone && <p className="error-message full-width">{errors.phone}</p>}


      <label style={{ marginTop: '1rem' }}>Filtrar por Nivel Educativo:</label>
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
      >
        <option value="">-- Mostrar todos --</option>
        {niveles.map((nivel, index) => (
          <option key={index} value={nivel}>{nivel}</option>
        ))}
      </select>

      <label style={{ marginTop: '1rem' }}>Asignar Cursos:</label>
      <Select
        isMulti
        name="courseIds"
        options={[...filteredOptions, ...selectedCourseObjects]}
        value={selectedCourseObjects}
        onChange={(selectedOptions) => {
          const selectedIds = selectedOptions.map(option => option.value);
          onChange({ target: { name: 'courseIds', value: selectedIds } });
        }}
        placeholder="Selecciona uno o varios cursos..."
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? 'btn-loading' : 'btn-guardar'}`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="spinner" /> Creando profesor...
            </>
          ) : (
            'Guardar'
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="btn btn-cancel"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProfessorForm;
