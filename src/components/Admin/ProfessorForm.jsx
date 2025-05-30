import React, { useState } from 'react';
import '../../styles/components/professorForm.css';
import {
  validateCedula,
  validatePhone,
  handleLetterInput,
  handleUppercaseChange
} from '../../services/validationService';

const ProfessorForm = ({ formData, onChange, onSubmit, onCancel }) => {
  const [errors, setErrors] = useState({});

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>Registrar Profesor</h2>

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
      {errors.identification && <p className="error-message">{errors.identification}</p>}

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={onChange}
        required
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
      {errors.phone && <p className="error-message">{errors.phone}</p>}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default ProfessorForm;
