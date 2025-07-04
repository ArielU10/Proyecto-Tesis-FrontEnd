import React, { useState } from 'react';
import AdminDashboardLayout from '../../../components/Admin/adminLayout';
import { FaQrcode, FaBell, FaClipboardCheck, FaUserPlus, FaBookOpen, FaExclamationTriangle, FaChartBar } from "react-icons/fa";
import userAvatar from '../../../assets/avatarMujer.png';
import '../../../styles/administrative/adminScreen.css';
import UserModal from '../../../components/Admin/userModal';
import CourseForm from '../../../components/Admin/CourseForm'; // ✅ importar el formulario
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify'; 


const AdminScreen = () => {
  // Modal usuario
  const [isModalOpen, setModalOpen] = useState(false);

  // Para utilizar datos de usuario logeado
  const { user } = useAuth();

  // Modal curso
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    courseName: '',
    level: '',
    description: ''
  });

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseFormData)
      });
    
      if (!res.ok) throw new Error('Error al guardar curso');
    
      toast.success("✅ Curso creado correctamente", {
        className: "toast-success"
      });
    
      setShowCourseModal(false);
      setCourseFormData({ courseName: '', level: '', description: '' });
    
    } catch (err) {
      console.error('❌ Error:', err);
      toast.error("❌ Error al guardar el curso", {
        className: "toast-error"
      });
    }
    
  };

console.log("👀 Usuario desde contexto:", user);


  return (
    <>
      {/* Modal de usuario */}
      <UserModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      {/* Modal de curso */}
      {showCourseModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal">
            <CourseForm
              formData={courseFormData}
              onChange={handleCourseChange}
              onSubmit={handleCourseSubmit}
              onClose={() => setShowCourseModal(false)}
            />
          </div>
        </div>
      )}

        <div className="admin-screen-layout">

          {/* Sección de bienvenida */}
          <div className="welcome box">
            <div className="welcome-text">
            <h2>Bienvenid@, {user?.firstName || 'Usuario'}!</h2>
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
          <div className="card-boton" onClick={() => setShowCourseModal(true)}>
            <FaBookOpen /> Agregar Curso
          </div>

          <div className="card-boton" onClick={() => setModalOpen(true)}>
            <FaUserPlus /> Agregar Usuario
          </div>

          <div className="card-boton"><FaExclamationTriangle /> Agregar Incidente</div>
          <div className="card-boton"><FaChartBar /> Ver Reportes</div>

        </div>
    </>
  );
};

export default AdminScreen;