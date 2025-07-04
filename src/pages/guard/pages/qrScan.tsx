import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle, QrCode } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

const QRScannerPage = ({ onNavigate, onStudentFound }) => {
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const qrRef = useRef(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const validateQRToken = async (token) => {
    try {
      const res = await fetch(`/api/guards/qr-token/${token}/validate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // o cambia según dónde guardas el token
        }
      });

      if (!res.ok) throw new Error("Token inválido o expirado");
      const data = await res.json();

      setScanResult(data.student.id_student);
      onStudentFound(data.student.id_student);
      onNavigate('student');
    } catch (err) {
      setError(err.message || "Error al validar QR");
    }
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        html5QrCode
          .start(
            cameraId,
            {
              fps: 10,
              qrbox: 250
            },
            (decodedText) => {
              html5QrCode.stop();
              const token = decodedText.split("/").pop(); // si el QR contiene una URL, extraemos el token
              validateQRToken(token);
            },
            (errorMessage) => {
              // puedes ignorar errores de lectura
            }
          )
          .catch((err) => setError("No se pudo iniciar la cámara"));
      }
    });

    scannerRef.current = html5QrCode;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="content-container">
      <h1 className="main-title">Escanear</h1>
      <h2 className="subtitle-1">Código QR</h2>
      <p className="subtitle-2">Apunta la cámara al código del estudiante</p>

      <div className="illustration-container">
        <div className="relative">
          <div id="reader" className="w-64 h-64 rounded-lg border-2 border-dashed border-white/30"></div>

          {/* Esquinas del scanner */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white"></div>
        </div>
      </div>

      {scanResult && (
        <div className="my-4 text-center text-green-400 font-mono text-sm">
          QR Detectado: {scanResult}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-200 text-sm text-center">{error}</p>
        </div>
      )}

      <div className="space-y-4 mt-4">
        <button
          onClick={() => onNavigate('home')}
          className="w-full bg-transparent border border-white/30 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
        >
          Regresar al Inicio
        </button>
      </div>
    </div>
  );
};

export default QRScannerPage;
