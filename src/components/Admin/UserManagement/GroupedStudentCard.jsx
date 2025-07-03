import React from "react";
import "../../../styles/components/userManagement/groupedStudentCard.css";
import { FaUserEdit, FaTrash, FaEye, FaChild } from "react-icons/fa";

const GroupedStudentCard = ({ student, onEdit, onDelete, onView }) => {
  const fullName = `${student.firstName} ${student.lastName}`;
  const rep = student.LegalRepresentative || student.representative || {};

  return (
    <div className="grouped-student-card fade-in">
      <div className="student-info">
        <h4><FaChild /> {fullName}</h4>
        <p><strong>Cédula:</strong> {student.identityCard}</p>
        <p><strong>Estado:</strong> {student.status}</p>
        {rep.firstName && (
          <p><strong>Representante:</strong> {rep.firstName} {rep.lastName}</p>
        )}
      </div>
      <div className="student-actions">
        <button className="view-btn" onClick={onView}><FaEye /></button>
        <button className="edit-btn" onClick={onEdit}><FaUserEdit /></button>
        <button className="delete-btn" onClick={onDelete}><FaTrash /></button>
      </div>
    </div>
  );
};

export default GroupedStudentCard;
