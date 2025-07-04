import React, { useState, useEffect } from "react";
import "../../../styles/components/userManagement/userDetailModal.css";

const UserDetailModal = ({ isOpen, onClose, user, onSave, role }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="user-modal-backdrop">
      <div className="user-modal">
        <h3>Editar {role}</h3>
        <form onSubmit={handleSubmit} className="user-modal-form">
          <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="Nombre" required />
          <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Apellido" required />
          <input type="text" name="identification" value={formData.identification || ''} onChange={handleChange} placeholder="Cédula" />
          <input type="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" />
          <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Teléfono" />
          {role === "legal_representative" && (
            <input type="text" name="address" value={formData.address || ''} onChange={handleChange} placeholder="Dirección" />
          )}

          <div className="modal-buttons">
            <button type="submit" className="save-btn">Guardar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailModal;
