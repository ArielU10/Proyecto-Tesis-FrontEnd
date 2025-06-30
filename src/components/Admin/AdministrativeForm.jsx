import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import '../../styles/components/userForms.css';
import {
  handleLetterInput,
  handleUppercaseChange,
  validatePhone,
  validateCedula,
  validateEmail
} from '../../services/validationService';

const AdministrativeForm = ({ formData, onChange, onSubmit, onCancel, isSubmitting }) => {
  const [errors, setErrors] = useState({});

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>Registrar Administrativo</h2>

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
        placeholder="Cédula"
        value={formData.identification}
        onChange={onChange}
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) e.preventDefault();
        }}
        onBlur={() => {
          if (formData.identification) {
            const isValid = validateCedula(formData.identification);
            setErrors((prev) => ({
              ...prev,
              identification: isValid ? '' : 'Cédula no válida'
            }));
          }
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


      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? 'btn-loading' : 'btn-guardar'}`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="spinner" /> Creando administrativo...
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

export default AdministrativeForm;
