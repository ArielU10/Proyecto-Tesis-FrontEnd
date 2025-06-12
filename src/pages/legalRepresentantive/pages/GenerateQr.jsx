import React, { useState } from 'react';
import '../../../styles/legalRepresentantive/LegalRepresentantiveHome.css';
import '../../../styles/legalRepresentantive/additionalLegalRepresentativeStyles.css';

const GenerateQRPage = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Datos de ejemplo de estudiantes
  const students = [
    { id: 1, name: 'Ana María González', grade: '5to A' },
    { id: 2, name: 'Carlos Eduardo López', grade: '3ro B' },
    { id: 3, name: 'María Fernanda Silva', grade: '2do A' }
  ];

  const generateQR = async () => {
    if (!selectedStudent) {
      alert('Por favor seleccione un estudiante');
      return;
    }

    setIsGenerating(true);
    
    // Simular generación de QR
    setTimeout(() => {
      const student = students.find(s => s.id.toString() === selectedStudent);
      const qrData = {
        studentId: student.id,
        studentName: student.name,
        timestamp: new Date().toISOString(),
        code: Math.random().toString(36).substr(2, 9).toUpperCase()
      };
      
      setQrCode(qrData);
      setIsGenerating(false);
    }, 2000);
  };

  const downloadQR = () => {
    // Funcionalidad para descargar QR
    alert('Descargando código QR...');
  };

  return (
    <div className="content-container">
      <h1 className="main-title">Generar Código QR</h1>
      <h2 className="subtitle-1">para Retiro Seguro</h2>

      <div className="qr-form-section">
        <div className="form-group">
          <label className="form-label">Seleccionar Estudiante:</label>
          <select 
            className="form-select"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Seleccione un estudiante --</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} - {student.grade}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="generate-btn"
          onClick={generateQR}
          disabled={isGenerating || !selectedStudent}
        >
          {isGenerating ? '🔄 Generando...' : '📱 Generar QR'}
        </button>
      </div>

      {qrCode && (
        <div className="qr-result-section">
          <div className="qr-card">
            <h3 className="qr-title">Código QR Generado</h3>
            <div className="qr-placeholder">
              <div className="qr-mock">
                <div className="qr-pattern"></div>
                <div className="qr-pattern"></div>
                <div className="qr-pattern"></div>
                <div className="qr-pattern"></div>
              </div>
            </div>
            <div className="qr-info">
              <p><strong>Estudiante:</strong> {qrCode.studentName}</p>
              <p><strong>Código:</strong> {qrCode.code}</p>
              <p><strong>Válido hasta:</strong> {new Date(Date.now() + 24*60*60*1000).toLocaleDateString()}</p>
            </div>
            <button className="download-btn" onClick={downloadQR}>
              📥 Descargar QR
            </button>
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