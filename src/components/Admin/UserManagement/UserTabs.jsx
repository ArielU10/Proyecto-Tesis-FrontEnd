import React from "react";
import "../../../styles/components/userManagement/userTabs.css"; // Puedes crear estilos separados si deseas

const roles = [
  { label: "Administrativos", value: "administrative" },
  { label: "Profesores", value: "professor" },
  { label: "Estudiantes + Padres", value: "student" },
  { label: "Seguridad", value: "guard" },
];

const UserTabs = ({ activeTab, onChange }) => {
  return (
    <div className="user-tabs-container">
      {roles.map((role) => (
        <button
          key={role.value}
          className={`tab-button ${activeTab === role.value ? "active" : ""}`}
          onClick={() => onChange(role.value)}
        >
          {role.label}
        </button>
      ))}
    </div>
  );
};

export default UserTabs;
