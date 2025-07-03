import { Outlet } from 'react-router-dom'; // ✅ Importa Outlet
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../styles/components/adminLayout.css';

const AdminDashboardLayout = () => {
  return (
    <div className="admin-grid">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <main className="main">
          <Outlet /> {/* ✅ Aquí se renderizan las rutas hijas como adminScreen, CourseScreen */}
          
        </main>
        <Footer />  {/* ✅ Siempre visible debajo del contenido */}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
