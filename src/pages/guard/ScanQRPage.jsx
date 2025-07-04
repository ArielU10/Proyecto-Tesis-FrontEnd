import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const ScanQRPage = () => {
  const scannerRef = useRef(null);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText, decodedResult) => {
        scanner.stop();
        setScanResult(decodedText);
        console.log("✅ QR Escaneado:", decodedText);
      },
      (scanError) => {
        // Opcional: manejar errores de escaneo en consola
      }
    ).catch((err) => {
      console.error("❌ Error al iniciar escáner:", err);
      setError("No se pudo acceder a la cámara.");
    });

    return () => {
      scanner.stop().then(() => {
        scanner.clear();
      }).catch((err) => console.error("Error al detener escáner:", err));
    };
  }, []);

  return (
    <div className="content-container">
      <h1 className="main-title">Escanear Código QR</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div id="qr-reader" style={{ width: "100%", maxWidth: "400px", margin: "auto" }}></div>

      {scanResult && (
        <div style={{ marginTop: "1rem", color: "green" }}>
          <h3>Resultado:</h3>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default ScanQRPage;
