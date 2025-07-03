import React from "react";
import "../../../styles/components/userManagement/userCard.css";
import { FaUserEdit, FaTrash, FaEye } from "react-icons/fa";

const UserCard = ({ user, onEdit, onDelete, onView }) => {
  return (
    <div className="user-card fade-in">
      <div className="user-card-header">
        <h3>{user.firstName} {user.lastName}</h3>
        <span className="user-role">{user.role || "—"}</span>
      </div>

      <div className="user-card-body">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Identificación:</strong> {user.identification || user.identityCard || "N/A"}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
      </div>

      <div className="user-card-actions">
        <button className="view-btn" onClick={() => onView(user)}><FaEye /></button>
        <button className="edit-btn" onClick={() => onEdit(user)}><FaUserEdit /></button>
        <button className="delete-btn" onClick={() => onDelete(user)}><FaTrash /></button>
      </div>
    </div>
  );
};

export default UserCard;
