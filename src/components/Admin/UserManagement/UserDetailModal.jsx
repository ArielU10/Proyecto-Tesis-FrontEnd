import React, { useState, useEffect } from "react";
import { X, Save, User, Mail, Phone, CreditCard, MapPin, Loader2 } from "lucide-react";
import "../../../styles/components/userManagement/userDetailModal.css";

const UserDetailModal = ({ isOpen, onClose, user, onSave, role }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
      setErrors({});
    }
  }, [user]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName?.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }
    
    if (!formData.lastName?.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Teléfono debe tener 10 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getRoleTitle = (role) => {
    const titles = {
      administrative: "Administrativo",
      professor: "Profesor",
      student: "Estudiante", 
      guard: "Guardia de Seguridad",
      legal_representative: "Representante Legal"
    };
    return titles[role] || "Usuario";
  };

  return (
    <div className="user-modal-backdrop" onClick={handleBackdropClick}>
      <div className="user-modal enhanced">
        <div className="modal-header">
          <div className="modal-title-section">
            <User size={24} />
            <h3>Editar {getRoleTitle(role)}</h3>
          </div>
          <button 
            className="close-btn"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-modal-form enhanced">
          <div className="form-grid">
            {/* Nombre */}
            <div className="form-group">
              <label htmlFor="firstName">
                <User size={16} />
                Nombre *
              </label>
              <input 
                type="text" 
                id="firstName"
                name="firstName" 
                value={formData.firstName || ''} 
                onChange={handleChange} 
                placeholder="Ingrese el nombre"
                className={errors.firstName ? 'error' : ''}
                required 
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            {/* Apellido */}
            <div className="form-group">
              <label htmlFor="lastName">
                <User size={16} />
                Apellido *
              </label>
              <input 
                type="text" 
                id="lastName"
                name="lastName" 
                value={formData.lastName || ''} 
                onChange={handleChange} 
                placeholder="Ingrese el apellido"
                className={errors.lastName ? 'error' : ''}
                required 
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            {/* Identificación */}
            <div className="form-group">
              <label htmlFor="identification">
                <CreditCard size={16} />
                Cédula de Identidad
              </label>
              <input 
                type="text" 
                id="identification"
                name="identification" 
                value={formData.identification || ''} 
                onChange={handleChange} 
                placeholder="1234567890"
                maxLength="10"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                <Mail size={16} />
                Correo Electrónico
              </label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={formData.email || ''} 
                onChange={handleChange} 
                placeholder="usuario@ejemplo.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Teléfono */}
            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={16} />
                Teléfono
              </label>
              <input 
                type="tel" 
                id="phone"
                name="phone" 
                value={formData.phone || ''} 
                onChange={handleChange} 
                placeholder="0987654321"
                className={errors.phone ? 'error' : ''}
                maxLength="10"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            {/* Dirección (solo para representantes legales) */}
            {role === "legal_representative" && (
              <div className="form-group full-width">
                <label htmlFor="address">
                  <MapPin size={16} />
                  Dirección
                </label>
                <input 
                  type="text" 
                  id="address"
                  name="address" 
                  value={formData.address || ''} 
                  onChange={handleChange} 
                  placeholder="Ingrese la dirección completa"
                />
              </div>
            )}
          </div>

          <div className="modal-buttons">
            <button 
              type="submit" 
              className="save-btn enhanced"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="spinning" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Guardar Cambios
                </>
              )}
            </button>
            <button 
              type="button" 
              className="cancel-btn enhanced" 
              onClick={onClose}
              disabled={loading}
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailModal;