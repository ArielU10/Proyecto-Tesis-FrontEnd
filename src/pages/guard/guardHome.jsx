import '../../styles/guard/guardHome.css';
import guardHomeImage from '../../assets/guardAssets/bodyGuard.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GuardHome = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 🔐 Limpia sesión
    navigate('/login'); // 🔁 Redirige
  };

  return (
    <div className="guard-container">
      <h1 className="guard-title">Bienvenido Guardia</h1>
      <h2 className="guard-subtitle">al Sistema de Control de Accesos</h2>
      <h3 className="guard-subtitle-2">con Tecnología QR</h3>

      <div className="guard-image-container">
        <img src={guardHomeImage} alt="Guardia Seguridad" />
      </div>

      <div className="guard-features">
        <h4>Instrucciones</h4>
        <div className="card">
          <p>Escanea los códigos QR desde tu panel de control</p>
        </div>
        <div className="card">
          <p>Valida la salida de los estudiantes de forma segura</p>
        </div>
        <div className="card">
          <p>Recuerda: un QR solo es válido por 24 horas</p>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Salir
      </button>
    </div>
  );
};

export default GuardHome;
