import React, { useState } from "react";
import UserTabs from "../../../components/Admin/UserManagement/UserTabs";
import UserList from "../../../components/Admin/UserManagement/UserList";
import "../../../styles/administrative/userScreen.css";
import {Users } from "lucide-react";

const UserScreen = () => {
  const [activeTab, setActiveTab] = useState("administrative");

  return (
    <div className="user-screen-container">
        <div className="user-header">
            <h2><Users /> Administración de Usuarios</h2>
        </div>
      <UserTabs activeTab={activeTab} onChange={setActiveTab} />
      <UserList activeTab={activeTab} />
    </div>
  );
};

export default UserScreen;
