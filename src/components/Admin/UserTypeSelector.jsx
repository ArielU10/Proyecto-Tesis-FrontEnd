import React from 'react';

const UserTypeSelector = ({ onSelect, onCancel }) => (
  <>
    <h2>¿Qué tipo de usuario deseas crear?</h2>
    <div className="user-type-options">
      <button onClick={() => onSelect('administrative')}>Administrativo</button>
      <button onClick={() => onSelect('professor')}>Profesor</button>
      <button onClick={() => onSelect('student')}>Estudiante + Padre de Familia</button>
      <button onClick={() => onSelect('guard')}>Personal de Seguridad</button>
    </div>
    <button className="close-btn" onClick={onCancel}>Cancelar</button>
  </>
);

export default UserTypeSelector;
