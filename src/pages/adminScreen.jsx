import React, { useState } from 'react';
import { AdminDashboardLayout } from '../components/Admin/adminLayout';
import { FaQrcode, FaBell, FaClipboardCheck, FaUserPlus, FaBookOpen, FaExclamationTriangle, FaChartBar } from "react-icons/fa";
import userAvatar from '../assets/avatarMujer.png';
import '../styles/administrative/adminScreen.css';
import UserModal from '../components/Admin/userModal';

const AdminScreen = () => {
  // Estado para controlar la apertura/cierre del modal
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Modal fuera del layout para que no sea afectado por z-index u overflow */}
      <UserModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <AdminDashboardLayout>
        <div className="admin-screen-layout">

          {/* Sección de bienvenida */}
          <div className="welcome box">
            <div className="welcome-text">
              <h2>Bienvenid@, Soledad !</h2>
              <p>al Portal de Seguridad y Comunicación Escolar.</p>
              <ul>
                <li><FaQrcode /> Retiro seguro con códigos QR</li>
                <li><FaBell /> Notificaciones inmediatas de asistencia y novedades</li>
                <li><FaClipboardCheck /> Gestión eficiente de permisos y autorizaciones</li>
              </ul>
            </div>
            <div className="welcome-avatar">
              <img src={userAvatar} alt="Avatar" />
            </div>
          </div>

          {/* Secciones de Acciones y Recientes */}
          <div className="acciones box">Acciones</div>
          <div className="informacion box">Recientes</div>

          {/* Botones de acciones principales */}
          <div className="card-boton"><FaBookOpen /> Agregar Curso</div>

          <div className="card-boton" onClick={() => setModalOpen(true)}>
            <FaUserPlus /> Agregar Usuario
          </div>

          <div className="card-boton"><FaExclamationTriangle /> Agregar Incidente</div>
          <div className="card-boton"><FaChartBar /> Ver Reportes</div>

        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminScreen;
