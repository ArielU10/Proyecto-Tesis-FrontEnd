// src/components/Admin/StudentForm.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/components/studentForm.css';
import axios from 'axios';

const StudentForm = ({ formData, onChange, onSubmit, onCancel }) => {
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});
  

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

  const validateCedula = (cedula) => {
    if (!/^\d{10}$/.test(cedula)) return false;
    const digits = cedula.split('').map(Number);
    const province = parseInt(cedula.substring(0, 2), 10);
    const thirdDigit = digits[2];
    if (province < 1 || province > 24 || thirdDigit >= 6) return false;

    const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const verifier = digits[9];
    const total = digits.slice(0, 9).reduce((sum, digit, index) => {
      let mult = digit * coef[index];
      if (mult > 9) mult -= 9;
      return sum + mult;
    }, 0);
    const checkDigit = (10 - (total % 10)) % 10;
    return checkDigit === verifier;
  };

  const handleLetterInput = (e) => {
    const key = e.key;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(key)) {
      e.preventDefault();
    }
  };

  const handleUppercaseChange = (e) => {
    const { name, value } = e.target;
    onChange({ target: { name, value: value.toUpperCase() } });
  };

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>Registrar Estudiante</h2>

      <input
        type="text"
        name="firstName"
        placeholder="Nombres del estudiante"
        value={formData.firstName}
        onKeyPress={handleLetterInput}
        onChange={handleUppercaseChange}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Apellidos del estudiante"
        value={formData.lastName}
        onKeyPress={handleLetterInput}
        onChange={handleUppercaseChange}
        required
      />

      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={onChange}
        required
      />

      <input
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
      {errors.identityCard && <p className="error-message">{errors.identityCard}</p>}

      <select name="status" value={formData.status} onChange={onChange} required>
        <option value="">-- Estado --</option>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>

      <select name="id_course" value={formData.id_course} onChange={onChange} required>
        <option value="">-- Curso --</option>
        {courses.map((course) => (
          <option key={course.id_course} value={course.id_course}>{course.courseName}</option>
        ))}
      </select>

      <h3>Datos del Representante Legal</h3>

      <input
        type="text"
        name="rep_firstName"
        placeholder="Nombres del representante"
        value={formData.rep_firstName}
        onKeyPress={handleLetterInput}
        onChange={handleUppercaseChange}
        required
      />

      <input
        type="text"
        name="rep_lastName"
        placeholder="Apellidos del representante"
        value={formData.rep_lastName}
        onKeyPress={handleLetterInput}
        onChange={handleUppercaseChange}
        required
      />

      <input
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
      {errors.rep_identification && <p className="error-message">{errors.rep_identification}</p>}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
            const isValid = /^\d{9}$/.test(formData.rep_phone);
            setErrors((prev) => ({
              ...prev,
              rep_phone: isValid ? '' : 'Número incorrecto (debe contener 9 dígitos)'
            }));
          }}
          maxLength={9}
          required
        />
      </div>
      {errors.rep_phone && <p className="error-message">{errors.rep_phone}</p>}

      <input
        type="email"
        name="rep_email"
        placeholder="Correo electrónico"
        value={formData.rep_email}
        onChange={onChange}
        required
      />

      <input
        type="text"
        name="rep_address"
        placeholder="Dirección"
        value={formData.rep_address}
        onChange={handleUppercaseChange}
        required
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default StudentForm;
