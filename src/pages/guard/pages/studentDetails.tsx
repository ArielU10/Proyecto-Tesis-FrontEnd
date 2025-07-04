import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, User } from "lucide-react";

const StudentDetailsPage = ({ studentId, onNavigate, onAuthorizeExit }) => {
  const [studentData, setStudentData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!studentId) return;

    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajusta según cómo manejas el token
          },
        });

        if (!response.ok) throw new Error("Error al obtener datos del estudiante");

        const data = await response.json();
        setStudentData(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información del estudiante");
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleAuthorizeExit = () => {
    const currentTime = new Date().toLocaleTimeString("es-EC", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    onAuthorizeExit(studentId, currentTime);
    setStudentData((prev) => prev ? ({ ...prev, exitTime: currentTime }) : null);
  };

  if (!studentData) {
    return (
      <div className="content-container">
        <h1 className="main-title">Cargando...</h1>
        {error && <p className="text-red-300">{error}</p>}
      </div>
    );
  }

  return (
    <div className="content-container">
      <h1 className="main-title">Información</h1>
      <h2 className="subtitle-1">del Estudiante</h2>

      <div className="mt-6 space-y-4">
        {/* Foto del estudiante */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Información */}
        <div className="space-y-3">
          <InfoItem label="ID Estudiante" value={studentData.id_student} />
          <InfoItem label="Nombre" value={`${studentData.firstName} ${studentData.lastName}`} />
          <InfoItem label="Grado" value={studentData.grade || "No asignado"} />
          <InfoItem label="Sección" value={studentData.section || "No asignada"} />
          <InfoItem label="Representante" value={studentData.representative || "No disponible"} />
          <InfoItem label="Teléfono" value={studentData.phone || "No disponible"} />

          <div className="feature-card">
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Estado:</span>
              <div className="flex items-center gap-2">
                {studentData.authorized ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Autorizado</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm">No Autorizado</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {studentData.exitTime && (
            <div className="feature-card bg-green-500/20 border-green-500/30">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Hora de Salida:</span>
                <span className="text-green-400 font-semibold text-sm">{studentData.exitTime}</span>
              </div>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="space-y-3 mt-8">
          {studentData.authorized && !studentData.exitTime && (
            <button
              onClick={handleAuthorizeExit}
              className="w-full bg-green-600/80 backdrop-blur-sm border border-green-500/30 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              Autorizar Salida
            </button>
          )}

          <button
            onClick={() => onNavigate("scanner")}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/30 transition-all duration-300"
          >
            Escanear Otro QR
          </button>

          <button
            onClick={() => onNavigate("home")}
            className="w-full bg-transparent border border-white/30 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
          >
            Regresar al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="feature-card">
    <div className="flex justify-between items-center">
      <span className="text-white/70 text-sm">{label}:</span>
      <span className="text-white text-sm">{value}</span>
    </div>
  </div>
);

export default StudentDetailsPage;
