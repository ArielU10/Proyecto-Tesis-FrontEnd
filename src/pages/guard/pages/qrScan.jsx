/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Camera, AlertCircle, CheckCircle } from "lucide-react";

const QRScan = () => {
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const isMountedRef = useRef(true);
  const processingRef = useRef(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const cleanupScanner = useCallback(async () => {
    if (html5QrCodeRef.current) {
      try {
        const scannerState = html5QrCodeRef.current.getState();
        if (scannerState === 2) {
          await html5QrCodeRef.current.stop();
        }
      } catch (err) {
        console.error("Error stopping QR scanner:", err);
      } finally {
        html5QrCodeRef.current = null;
      }
    }
  }, []);

  const processQRCode = useCallback(
    async (decodedText) => {
      if (processingRef.current || !isMountedRef.current || scanned) {
        return;
      }
      processingRef.current = true;
      setScanned(true);
      setIsLoading(false);

      const token = extractToken(decodedText);
      if (!token) {
        handleError("QR inválido o sin token");
        processingRef.current = false;
        return;
      }
      try {
        console.log("Token de usuario enviado al backend:", user?.token);
        const response = await axios.get(
          `http://localhost:3000/api/guards/qr-token/${token}/validate`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (!isMountedRef.current) return;

        if (response.data.valid) {
          setSuccessMessage("QR válido. Redirigiendo...");
          setError(null);
          setIsLoading(false);

          // SOLUCIÓN MEJORADA: Limpiar y ocultar inmediatamente
          await cleanupScanner();
          
          // Ocultar el scanner inmediatamente
          if (qrRef.current) {
            qrRef.current.style.display = 'none';
          }
          
          setIsNavigating(true);
          
          // Navegar después de un breve delay
          setTimeout(() => {
            if (isMountedRef.current) {
              navigate(`/guard/student/${token}`, {
                state: {
                  student: response.data.student,
                  fromQRScan: true,
                },
                replace: true,
              });
            }
          }, 500);
        } else {
          handleError("QR inválido o estudiante no encontrado");
        }
      } catch (err) {
        if (!isMountedRef.current) return;

        console.error("Error validando QR:", err);
        const errorMessage =
          err.response?.data?.message || "Error validando QR";
        handleError(errorMessage);
      } finally {
        processingRef.current = false;
      }
    },
    [user?.token, navigate, scanned, cleanupScanner]
  );

  useEffect(() => {
    isMountedRef.current = true;

    const initializeScanner = async () => {
      // SOLUCIÓN 2: No inicializar si ya estamos navegando
      if (!qrRef.current || !isMountedRef.current || isNavigating) {
        setError("Elemento del escáner no disponible");
        setIsLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!isMountedRef.current || isNavigating) return;

      try {
        const devices = await Html5Qrcode.getCameras();
        if (!devices.length) {
          setError("No se detectaron cámaras disponibles.");
          setIsLoading(false);
          return;
        }

        if (!qrRef.current || qrRef.current.clientWidth === 0 || isNavigating) {
          setError("El contenedor QR aún no está visible.");
          setIsLoading(false);
          return;
        }

        const qrRegionId = "qr-reader";
        const html5QrCode = new Html5Qrcode(qrRegionId);
        html5QrCodeRef.current = html5QrCode;

        await startScanner(devices[0].id, html5QrCode);
      } catch (err) {
        console.error("Error inicializando scanner:", err);
        if (isMountedRef.current && !isNavigating) {
          setError("Error accediendo a la cámara.");
          setIsLoading(false);
        }
      }
    };

    // SOLUCIÓN 3: Solo inicializar si no estamos navegando
    if (!isNavigating) {
      initializeScanner();
    }

    return () => {
      isMountedRef.current = false;
      cleanupScanner();
    };
  }, [cleanupScanner, isNavigating]); // Agregar isNavigating como dependencia

  const startScanner = (cameraId, html5QrCode) => {
    // SOLUCIÓN 4: Verificar estado de navegación antes de iniciar
    if (isNavigating || !isMountedRef.current) return;
    
    try {
      html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
        processQRCode,
        () => {
          if (isMountedRef.current && !isNavigating) {
            setIsLoading(false);
          }
        }
      );
    } catch (err) {
      console.error("Error iniciando el escáner QR:", err);
      if (isMountedRef.current && !isNavigating) {
        setError("Error iniciando el escáner QR.");
        setIsLoading(false);
      }
    }
  };

  const extractToken = (data) => {
    try {
      if (data.includes("token=")) {
        const url = new URL(data);
        return url.searchParams.get("token");
      }
      if (data.length > 10) return data;
    } catch {
      return null;
    }
    return null;
  };

  const handleError = async (msg) => {
    if (!isMountedRef.current || isNavigating) return;

    setError(msg);
    setIsLoading(false);

    await cleanupScanner();

    setTimeout(() => {
      if (isMountedRef.current && !isNavigating) {
        setError(null);
        setScanned(false);
        processingRef.current = false;
        setIsLoading(true);

        Html5Qrcode.getCameras()
          .then((devices) => {
            if (devices.length > 0 && isMountedRef.current && !isNavigating) {
              const qrRegionId = "qr-reader";
              const html5QrCode = new Html5Qrcode(qrRegionId);
              html5QrCodeRef.current = html5QrCode;
              startScanner(devices[0].id, html5QrCode);
            }
          })
          .catch(console.error);
      }
    }, 3000);
  };

  // SOLUCIÓN 5: Renderizado condicional mejorado
  if (isNavigating) {
    return (
      <div className="qr-scan-page">
        <div className="qr-scan-header">
          <h2 className="qr-scan-title">Redirigiendo...</h2>
        </div>
        <div className="qr-scanner-container">
          <div className="redirect-loading">
            <div className="redirect-spinner"></div>
            <p className="loading-text">
              Cargando información del estudiante...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-scan-page">
      <div className="qr-scan-header">
        <h2 className="qr-scan-title">Escanear Código QR</h2>
        <p className="qr-scan-subtitle">
          Apunta la cámara hacia el código QR del estudiante
        </p>
      </div>

      <div className="qr-scanner-container">
        <div className="qr-reader-wrapper">
          {/* SOLUCIÓN 6: Solo renderizar el div del scanner si no estamos navegando */}
          {!isNavigating && <div ref={qrRef} id="qr-reader" />}

          {!error && !successMessage && !isNavigating && !scanned && !isLoading && (
            <div className="scanner-overlay">
              <div className="scanner-frame">
                <div className="scanner-corners"></div>
                <div className="scan-line"></div>
              </div>
            </div>
          )}

          {isLoading && !error && !successMessage && !isNavigating && !scanned && (
            <div className="scanner-loading">
              <div className="loading-spinner"></div>
              <p className="loading-text">Iniciando cámara...</p>
            </div>
          )}
        </div>

        <div className="scan-instructions">
          <h3 className="scan-instructions-title">
            <Camera className="w-5 h-5 inline mr-2" />
            Instrucciones
          </h3>
          <p className="scan-instructions-text">
            Mantén el código QR dentro del marco y espera a que se escanee
            automáticamente
          </p>
        </div>

        {error && !isNavigating && (
          <div className="alert-error">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && !isNavigating && (
          <div className="alert-success">
            <CheckCircle className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScan;