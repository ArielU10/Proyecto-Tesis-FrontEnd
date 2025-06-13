/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/legalRepresentantive/LegalRepresentantiveHome.css';
import '../../../styles/legalRepresentantive/additionalLegalRepresentativeStyles.css';

const GenerateQRPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [qrCode, setQrCode] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [qrUrl, setQrUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Referencias para el scroll
  const formSectionRef = useRef(null);
  const qrResultRef = useRef(null);

  const { user } = useAuth();

  const token = user?.token || localStorage.getItem('token');
  const roleId = user?.user?.roleId;

  useEffect(() => {
    console.log('🔍 Datos del usuario:', {
      roleId,
      hasToken: !!token,
      userObject: user
    });

    if (roleId && token) {
      fetchStudents();
    } else {
      setError('Usuario no encontrado o token no disponible');
      setLoading(false);
    }
  }, [roleId, token]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`http://localhost:3000/api/legal-representatives/${roleId}/students`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        if (response.status === 401) {
          setError('Token de autorización inválido. Por favor, inicie sesión nuevamente.');
        } else if (response.status === 404) {
          setError('Representante legal no encontrado o no tiene estudiantes asociados.');
        } else {
          setError(`Error del servidor (${response.status}): ${errorText}`);
        }
        return;
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setStudents(data);
      } else {
        setError('No se encontraron estudiantes asociados a este representante.');
      }

    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateQR = async () => {
    if (!selectedStudent) {
      alert('Por favor seleccione un estudiante');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {   
      const response = await fetch(`http://localhost:3000/api/legal-representatives/${roleId}/estudiantes/${selectedStudent}/qr`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error generando QR:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      setQrCode(data.qr);
      setQrUrl(data.url || '');

      // Scroll suave al resultado del QR después de generarlo
      setTimeout(() => {
        if (qrResultRef.current) {
          qrResultRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);

    } catch (error) {
      console.error('Error en generateQR:', error);
      setError('Error al generar el código QR. Intente nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `QR-${getStudentName()}-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStudentName = () => {
    const student = students.find(s => 
      s.id_student?.toString() === selectedStudent || 
      s.id?.toString() === selectedStudent
    );
    return student ? `${student.first_name} ${student.last_name}` : 'Estudiante';
  };

  const resetQR = () => {
    setQrCode(null);
    setQrUrl('');
    setSelectedStudent('');
    
    // Scroll de vuelta al formulario
    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  if (loading) {
    return (
      <div className="content-container">
        <div className="loading-message">
          <p>Cargando estudiantes...</p>
          <p style={{ fontSize: '0.8em', color: '#666' }}>
            Representante ID: {roleId}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h1 className="main-title">Generar Código QR</h1>
      <h2 className="subtitle-1">para Retiro Seguro</h2>

      {error && (
        <div className="error-message" style={{ 
          color: 'red', 
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#ffe6e6',
          border: '1px solid #ffcccc',
          borderRadius: '4px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="qr-form-section" ref={formSectionRef}>
        <div className="form-group">
          <label className="form-label">Seleccionar Estudiante:</label>
          <select
            className="form-select"
            value={selectedStudent}
            onChange={(e) => {
              setSelectedStudent(e.target.value);
            }}
            disabled={isGenerating || students.length === 0}
          >
            <option value="">
              {students.length === 0 
                ? "-- No hay estudiantes disponibles --" 
                : "-- Seleccione un estudiante --"
              }
            </option>
            {students.map(student => (
              <option
                key={student.id_student || student.id}
                value={student.id_student || student.id}
              >
                {student.first_name} {student.last_name} - {student.grade || 'N/A'}
              </option>
            ))}
          </select>
        </div>

        <button
          className="generate-btn"
          onClick={generateQR}
          disabled={isGenerating || !selectedStudent || students.length === 0}
        >
          {isGenerating ? '🔄 Generando...' : '📱 Generar QR'}
        </button>
      </div>

      {qrCode && (
        <div className="qr-result-section" ref={qrResultRef}>
          <div className="qr-card">
            <h3 className="qr-title">Código QR Generado</h3>
            <div className="qr-container">
              <img
                src={qrCode}
                alt="Código QR para retiro"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
              />
            </div>
            <div className="qr-info">
              <p><strong>Estudiante:</strong> {getStudentName()}</p>
              <p><strong>Válido hasta:</strong> {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')}</p>
            </div>
            <div className="qr-actions">
              <button className="download-btn" onClick={downloadQR}>
                📥 Descargar QR
              </button>
              <button className="reset-btn" onClick={resetQR} style={{ marginLeft: '10px' }}>
                🔄 Generar Otro
              </button>
              {/* Botón adicional para volver al formulario */}
              <button 
                className="scroll-to-form-btn" 
                onClick={scrollToForm}
                style={{ 
                  marginLeft: '10px',
                  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                ⬆️ Ir al Formulario
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="info-section">
        <h4 className="info-title">Instrucciones</h4>
        <div className="info-card">
          <p>• El código QR es válido por 24 horas</p>
          <p>• Comparta el código solo con personas autorizadas</p>
          <p>• El código se puede usar una sola vez</p>
          <p>• En caso de pérdida, genere un nuevo código</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateQRPage;