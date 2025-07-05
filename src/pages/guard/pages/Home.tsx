import {
  Camera,
  User,
  QrCode,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="content-container">
      <h1 className="main-title">Sistema de</h1>
      <h2 className="subtitle-1">Guardias</h2>
      <p className="subtitle-2">Control de Salida Estudiantil</p>
      
      <div className="guard-illustration-container">
        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
          <QrCode className="w-16 h-16 text-white" />
        </div>
      </div>

      <div className="features-section">
        <h3 className="features-title">Funciones Principales</h3>
        <div className="features-grid">
          <div className="feature-card">
            <QrCode className="w-6 h-6 text-white mb-2" />
            <p className="feature-item">
              Escanear código QR del estudiante para verificar identidad
            </p>
          </div>
          <div className="feature-card">
            <CheckCircle className="w-6 h-6 text-white mb-2" />
            <p className="feature-item">
              Autorizar salida del estudiante de la institución
            </p>
          </div>
          <div className="feature-card">
            <User className="w-6 h-6 text-white mb-2" />
            <p className="feature-item">
              Ver información detallada del estudiante
            </p>
          </div>
          {/* <div className="feature-card">
            <AlertCircle className="w-6 h-6 text-white mb-2" />
            <p className="feature-item">
              Registro de salidas para control administrativo
            </p>
          </div> */}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/guard/qrScan')}
          className="guard-button"
        >
          <Camera className="w-6 h-6" />
          Iniciar Escaneo QR
        </button>
      </div>
    </div>
  )
}

export default Home
