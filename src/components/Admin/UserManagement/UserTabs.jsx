import React from "react";
import { Users, GraduationCap, UserCheck, Shield } from "lucide-react";
import "../../../styles/components/userManagement/userTabs.css";

const roles = [
  { 
    label: "Administrativos", 
    value: "administrative",
    icon: Users,
    description: "Personal administrativo"
  },
  { 
    label: "Profesores", 
    value: "professor",
    icon: GraduationCap,
    description: "Cuerpo docente"
  },
  { 
    label: "Estudiantes + Padres", 
    value: "student",
    icon: UserCheck,
    description: "Estudiantes y representantes"
  },
  { 
    label: "Seguridad", 
    value: "guard",
    icon: Shield,
    description: "Personal de seguridad"
  },
];

const UserTabs = ({ activeTab, onChange }) => {
  return (
    <div className="user-tabs-container enhanced">
      <div className="tabs-wrapper">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <button
              key={role.value}
              className={`tab-button enhanced ${activeTab === role.value ? "active" : ""}`}
              onClick={() => onChange(role.value)}
            >
              <div className="tab-content">
                <div className="tab-icon">
                  <IconComponent size={20} />
                </div>
                <div className="tab-text">
                  <span className="tab-label">{role.label}</span>
                  <span className="tab-description">{role.description}</span>
                </div>
              </div>
              {activeTab === role.value && <div className="tab-indicator" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UserTabs;