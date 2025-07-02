import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../styles/components/adminLayout.css';

const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="admin-grid">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <main className="main">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardLayout;
