import React, { useState } from 'react';
import {
  validateCedula,
  validatePhone,
  handleLetterInput,
  handleUppercaseChange,
  validateEmail
} from '../../services/validationService';
import { FaSpinner } from 'react-icons/fa';

const GuardForm = ({ formData, onChange, onSubmit, onCancel, isSubmitting }) => {
  const [errors, setErrors] = useState({});

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>Registrar Guardia</h2>

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
        placeholder="Cédula (10 dígitos)"
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
                phone: isValid ? '' : 'Número incorrecto (9 dígitos)'
              }));
            }
          }}
          maxLength={9}
        />
      </div>
      {errors.phone && <p className="error-message full-width">{errors.phone}</p>}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', gridColumn: 'span 2' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? 'btn-loading' : 'btn-guardar'}`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="spinner" /> Creando personal de Seguridad...
            </>
          ) : (
            'Registrar Guardia'
          )}
        </button>

        <button
          type="button"
          className="btn btn-cancel"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default GuardForm;
