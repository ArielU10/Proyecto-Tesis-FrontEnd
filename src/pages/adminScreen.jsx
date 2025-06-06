import React from 'react';
import { AdminDashboardLayout } from '../components/Admin/adminLayout';
import { FaQrcode, FaBell, FaClipboardCheck } from 'react-icons/fa';
import userAvatar from '../assets/avatarMujer.png';
import '../styles/administrative/adminScreen.css'; 

const AdminScreen = () => {
  return (
    <AdminDashboardLayout>
      <div className="admin-screen-layout">
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
        <div className="acciones box">Acciones</div>

        <div className="resumen box">Resumen Diario</div>
        <div className="recientes box">Recientes</div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminScreen;
