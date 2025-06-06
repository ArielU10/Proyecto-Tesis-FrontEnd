// src/components/Admin/LegalRepresentativeForm.jsx
import React from 'react';
import '../../styles/components/legalRepresentativeForm.css';

const LegalRepresentativeForm = ({ formData, onChange, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>Registrar Padre de Familia</h2>

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
        type="text"
        name="identification"
        placeholder="Cédula o Identificación"
        value={formData.identification}
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
        name="address"
        placeholder="Dirección (opcional)"
        value={formData.address}
        onChange={onChange}
      />

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default LegalRepresentativeForm;
