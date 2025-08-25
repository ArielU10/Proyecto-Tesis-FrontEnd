import React, { useState } from "react";
import "../../../styles/components/userManagement/userCard.css";
import { FaUserEdit, FaTrash, FaEye, FaUser, FaPhone, FaEnvelope, FaIdCard } from "react-icons/fa";
import { Loader2, AlertTriangle } from "lucide-react";

const UserCard = ({ user, onEdit, onDelete, onView }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Función para obtener las iniciales del usuario
  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last || 'U';
  };

  // Función para determinar el color del rol
  const getRoleColor = (role) => {
    const roleColors = {
      'admin': 'admin-role',
      'profesor': 'profesor-role',
      'legal_representative': 'parent-role',
      'estudiante': 'student-role'
    };
    return roleColors[role?.toLowerCase()] || 'default-role';
  };

  // Manejar eliminación con confirmación
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setLoadingDelete(true);
    try {
      await onDelete(user);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="user-card fade-in">
      {/* Confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-content">
            <AlertTriangle size={24} />
            <h4>¿Eliminar usuario?</h4>
            <p>{user.firstName} {user.lastName}</p>
            <div className="delete-confirmation-actions">
              <button 
                className="confirm-delete-btn"
                onClick={confirmDelete}
                disabled={loadingDelete}
              >
                {loadingDelete ? (
                  <Loader2 size={14} className="spinning" />
                ) : (
                  "Eliminar"
                )}
              </button>
              <button 
                className="cancel-delete-btn"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="user-card-header">
        <div className="user-avatar">
          <span className="user-initials">
            {getInitials(user.firstName, user.lastName)}
          </span>
        </div>
        <div className="user-header-info">
          <h3>{user.firstName} {user.lastName}</h3>
        </div>
      </div>

      <div className="user-card-body">
        <div className="user-info-item">
          <FaEnvelope className="info-icon" />
          <div className="info-content">
            <span className="info-label">Email</span>
            <span className="info-value">{user.email}</span>
          </div>
        </div>

        <div className="user-info-item">
          <FaIdCard className="info-icon" />
          <div className="info-content">
            <span className="info-label">Identificación</span>
            <span className="info-value">{user.identification || user.identityCard || "N/A"}</span>
          </div>
        </div>

        <div className="user-info-item">
          <FaPhone className="info-icon" />
          <div className="info-content">
            <span className="info-label">Teléfono</span>
            <span className="info-value">{user.phone || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="user-card-actions">
        <button 
          className="action-btn view-btn" 
          onClick={() => onView(user)}
          title="Ver detalles"
        >
          <FaEye />
        </button>
        <button 
          className="action-btn edit-btn" 
          onClick={() => onEdit(user)}
          title="Editar usuario"
        >
          <FaUserEdit />
        </button>
        <button 
          className="action-btn delete-btn" 
          onClick={handleDeleteClick}
          disabled={loadingDelete}
          title="Eliminar usuario"
        >
          {loadingDelete ? (
            <Loader2 size={16} className="spinning" />
          ) : (
            <FaTrash />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;