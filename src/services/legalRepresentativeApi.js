import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// ✔️ Obtener todos los representantes
export const getAllLegalRepresentatives = async () => {
  const response = await axios.get(`${BASE_URL}/legal_representatives`);
  return response.data;
};

// ✔️ Obtener un representante por ID
export const getLegalRepresentativeById = async (id) => {
  const response = await axios.get(`${BASE_URL}/legal_representatives/${id}`);
  return response.data;
};

// ✔️ Crear representante (incluye creación de usuario + envío de correo)
export const createLegalRepresentative = async (data) => {
  const response = await axios.post(`${BASE_URL}/legal_representatives`, data);
  return response.data;
};

// ✔️ Actualizar representante
export const updateLegalRepresentative = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/legal_representatives/${id}`, data);
  return response.data;
};

// ✔️ Eliminar representante
export const deleteLegalRepresentative = async (id) => {
  const response = await axios.delete(`${BASE_URL}/legal_representatives/${id}`);
  return response.data;
};

// ✔️ Obtener estudiantes asociados a un representante
export const getStudentsByRepresentative = async (repId) => {
  const response = await axios.get(`${BASE_URL}/legal_representatives/${repId}/students`);
  return response.data;
};

// ✔️ Generar código QR para retirar estudiante
export const generateQR = async (repId, studentId) => {
  const response = await axios.get(`${BASE_URL}/legal_representatives/${repId}/generate-qr/${studentId}`);
  return response.data; // contiene { qr, url }
};

// ✔️ Obtener asistencias del estudiante asociado a representante
export const getAsistances = async (repId, studentId) => {
  const response = await axios.get(`${BASE_URL}/legal_representatives/${repId}/asistances/${studentId}`);
  return response.data;
};

// ✔️ Obtener incidentes del estudiante asociado a representante
export const getIncidents = async (repId, studentId) => {
  const response = await axios.get(`${BASE_URL}/legal_representatives/${repId}/incidents/${studentId}`);
  return response.data;
};
