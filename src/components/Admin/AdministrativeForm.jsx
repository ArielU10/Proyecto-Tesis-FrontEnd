// src/components/Admin/AdministrativeForm.jsx
import React from 'react';
import '../../styles/components/administrativeForm.css';

const AdministrativeForm = ({ formData, onChange, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>Registrar Administrativo</h2>

      <input
        type="text"
        name="firstName"
        placeholder="Nombres"
        value={formData.firstName}
        onChange={onChange}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Apellidos"
        value={formData.lastName}
        onChange={onChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={onChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Teléfono (opcional)"
        value={formData.phone}
        onChange={onChange}
      />

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default AdministrativeForm;
