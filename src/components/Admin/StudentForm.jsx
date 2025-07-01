import React, { useEffect, useState } from 'react';
import '../../styles/components/userForms.css';
import axios from 'axios';
import {
  validateCedula,
  validatePhone,
  handleLetterInput,
  handleUppercaseChange,
  validateEmail
} from '../../services/validationService';
import { FaSpinner } from 'react-icons/fa';

const StudentForm = ({ formData, onChange, onSubmit, onCancel, isSubmitting }) => {
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});
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
      try {
        const courseRes = await axios.get('http://localhost:3000/api/courses');
        setCourses(courseRes.data);
      } catch (error) {
        console.error('Error al cargar cursos:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>Datos del Estudiante</h2>

      <input
        type="text"
        name="firstName"
        placeholder="Nombres del estudiante"
        value={formData.firstName}
        onKeyPress={handleLetterInput}
        onChange={(e) => handleUppercaseChange(e, onChange)}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Apellidos del estudiante"
        value={formData.lastName}
        onKeyPress={handleLetterInput}
        onChange={(e) => handleUppercaseChange(e, onChange)}
        required
      />

      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={onChange}
        required
      />

      <select name="status" value={formData.status} onChange={onChange} required>
        <option value="">-- Estado --</option>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>

      <input
        className="full-width"
        type="text"
        name="identityCard"
        placeholder="Cédula del estudiante"
        value={formData.identityCard}
        onChange={onChange}
        onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
        onBlur={() => {
          const isValid = validateCedula(formData.identityCard);
          setErrors((prev) => ({
            ...prev,
            identityCard: isValid ? '' : 'Cédula de identidad no válida'
          }));
        }}
        maxLength={10}
        required
      />
      {errors.identityCard && (
        <p className="error-message full-width">{errors.identityCard}</p>
      )}
    

      <label style={{ marginTop: '1rem' }}>Nivel Educativo:</label>
      <select
        value={selectedLevel}
        onChange={(e) => {
          setSelectedLevel(e.target.value);
          onChange({ target: { name: 'id_course', value: '' } });
        }}
        required
      >
        <option value="">-- Selecciona el nivel educativo --</option>
        {niveles.map((nivel, index) => (
          <option key={index} value={nivel}>{nivel}</option>
        ))}
      </select>

      <label style={{ marginTop: '1rem' }}>Curso:</label>
      <select
        name="id_course"
        value={formData.id_course}
        onChange={onChange}
        disabled={!selectedLevel}
        required
      >
        <option value="">-- Selecciona un curso --</option>
        {courses
          .filter(course => course.level === selectedLevel)
          .map((course) => (
            <option key={course.id_course} value={course.id_course}>
              {course.courseName} - {course.description}
            </option>
        ))}
      </select>

      <h2>Datos del Representante Legal</h2>

      <input
        type="text"
        name="rep_firstName"
        placeholder="Nombres del representante"
        value={formData.rep_firstName}
        onKeyPress={handleLetterInput}
        onChange={(e) => handleUppercaseChange(e, onChange)}
        required
      />

      <input
        type="text"
        name="rep_lastName"
        placeholder="Apellidos del representante"
        value={formData.rep_lastName}
        onKeyPress={handleLetterInput}
        onChange={(e) => handleUppercaseChange(e, onChange)}
        required
      />

      <input
        className="full-width"
        type="text"
        name="rep_identification"
        placeholder="Cédula del representante"
        value={formData.rep_identification}
        onChange={onChange}
        onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
        onBlur={() => {
          const isValid = validateCedula(formData.rep_identification);
          setErrors((prev) => ({
            ...prev,
            rep_identification: isValid ? '' : 'Cédula de identidad no válida'
          }));
        }}
        maxLength={10}
        required
      />
      {errors.rep_identification && (
        <p className="error-message full-width">{errors.rep_identification}</p>
      )}


      <div className="full-width" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ whiteSpace: 'nowrap' }}>+593</span>
        <input
          type="text"
          name="rep_phone"
          placeholder="Ej: 998000597"
          value={formData.rep_phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,9}$/.test(value)) {
              onChange({ target: { name: 'rep_phone', value } });
            }
          }}
          onBlur={() => {
            const isValid = validatePhone(formData.rep_phone);
            setErrors((prev) => ({
              ...prev,
              rep_phone: isValid ? '' : 'Número incorrecto (debe contener 9 dígitos)'
            }));
          }}
          maxLength={9}
          required
        />
      </div>
      {errors.rep_phone && <p className="error-message full-width">{errors.rep_phone}</p>}


      <input
        className="full-width"
        type="email"
        name="rep_email"
        placeholder="Correo electrónico"
        value={formData.rep_email}
        onChange={onChange}
        onBlur={() => {
          const isValid = validateEmail(formData.rep_email);
          setErrors((prev) => ({
            ...prev,
            rep_email: isValid ? '' : 'Correo electrónico no válido'
          }));
        }}
        required
      />
      {errors.rep_email && (
        <p className="error-message full-width">{errors.rep_email}</p>
      )}


      <input
        type="text"
        name="rep_address"
        placeholder="Dirección"
        value={formData.rep_address}
        onChange={(e) => handleUppercaseChange(e, onChange)}
        required
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? 'btn-loading' : 'btn-guardar'}`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="spinner" /> Creando estudiante...
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

export default StudentForm;
