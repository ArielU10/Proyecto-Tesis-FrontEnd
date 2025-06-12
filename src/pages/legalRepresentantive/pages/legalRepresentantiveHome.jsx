import '../../../styles/legalRepresentantive/LegalRepresentantiveHome.css';
import LegalRepresentativeLayout from '../../../components/legalRepresentative/LegalRepresentativeLayout';
import legalRepresentantiveHomeImage from '../../../assets/legalRepresentativeAssets/legalRepresentativeHomeImage.svg'

const LegalRepresentantiveHomepage = () => {

  return (
    <div className="content-container">
      <h1 className="main-title">Bienvenido</h1>
      <h2 className="subtitle-1">al Portal de Seguridad</h2>
      <h3 className="subtitle-2">y Comunicación Escolar</h3>

      <div className="illustration-container">
        <img src={legalRepresentantiveHomeImage} alt="Logo" />
      </div>

      <div className="features-section">
        <h4 className="features-title">Funcionalidades</h4>
        <div className="features-grid">
          <div className="feature-card">
            <p className="feature-item">Retiro seguro con códigos QR</p>
          </div>
          <div className="feature-card">
            <p className="feature-item">Notificaciones inmediatas de asistencia y novedades</p>
          </div>
          <div className="feature-card">
            <p className="feature-item">Gestión eficiente de permisos y autorizaciones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalRepresentantiveHomepage;