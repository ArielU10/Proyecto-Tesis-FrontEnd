import React, { useState, useEffect } from 'react';
import { getAdministrativeById, updateAdministrative } from "../../services/administrativeApi";
import { validateEmail, validatePhone, handleLetterInput, handleUppercaseChange } from '../../services/validationService';

const EditAdminProfile = ({ show, onHide, onProfileUpdate }) => {
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.roleId) {
        setLoading(true);
        getAdministrativeById(user.roleId)
          .then((data) => {
            setAdmin(data);
            setFormData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              phone: data.phone || ''
            });
            setErrors({});
          })
          .catch((error) => {
            console.error('Error al cargar datos:', error);
            setErrors({ general: 'Error al cargar los datos del perfil' });
          })
          .finally(() => setLoading(false));
      }
    }
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo específico
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNameChange = (e) => {
    handleUppercaseChange(e, handleInputChange);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    // Validar apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Validar teléfono (opcional)
    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener exactamente 9 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await updateAdministrative(admin.id_administrative, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null
      });

      // Actualizar localStorage con los nuevos datos
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = {
        ...currentUser,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim()
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Callback para actualizar el header
      if (onProfileUpdate) {
        onProfileUpdate(updatedUser);
      }

      onHide();
    } catch (error) {
      console.error('Error al guardar:', error);
      setErrors({ general: 'Error al guardar los cambios. Intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) {
      handleInputChange({ target: { name: 'phone', value } });
    }
  };

  if (!show) return null;

  return (
    <div className="event-modal-backdrop" onClick={onHide}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header del modal */}
        <div className="event-modal-header">
          <div className="modal-title">
            <h3>Editar Perfil Administrativo</h3>
          </div>
          <button className="close-btn" onClick={onHide}>×</button>
        </div>

        {/* Contenido del modal */}
        <div className="event-modal-content">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Cargando...
            </div>
          ) : (
            <div className="event-form">
              
              {/* Error general */}
              {errors.general && (
                <div style={{ 
                  color: '#ef4444', 
                  backgroundColor: '#fef2f2', 
                  border: '1px solid #fecaca',
                  padding: '12px', 
                  borderRadius: '8px', 
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  {errors.general}
                </div>
              )}

              {/* Datos no editables */}
              <div className="form-group">
                <label>Identificación:</label>
                <div style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#6b7280',
                  fontSize: '12px'
                }}>
                  {admin?.identification || 'No disponible'}
                </div>
              </div>

              {/* Nombre */}
              <div className="form-group">
                <label htmlFor="firstName">Nombre *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleNameChange}
                  onKeyPress={handleLetterInput}
                  style={{
                    borderColor: errors.firstName ? '#ef4444' : '#d1d5db'
                  }}
                />
                {errors.firstName && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.firstName}
                  </div>
                )}
              </div>

              {/* Apellido */}
              <div className="form-group">
                <label htmlFor="lastName">Apellido *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleNameChange}
                  onKeyPress={handleLetterInput}
                  style={{
                    borderColor: errors.lastName ? '#ef4444' : '#d1d5db'
                  }}
                />
                {errors.lastName && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.lastName}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    borderColor: errors.email ? '#ef4444' : '#d1d5db'
                  }}
                />
                {errors.email && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Ej: 987654321"
                  inputMode="numeric"
                  style={{
                    borderColor: errors.phone ? '#ef4444' : '#d1d5db'
                  }}
                />
                {errors.phone && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.phone}
                  </div>
                )}
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                  Opcional. Solo números, 9 dígitos.
                </div>
              </div>

              {/* Botones */}
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn3" 
                  onClick={onHide}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="submit-btn3" 
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditAdminProfile;