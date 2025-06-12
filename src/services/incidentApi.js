import axios from "axios";

const API_URL = "http://localhost:3000/api/incidents";

// Crear un nuevo incidente
export const createIncident = async (incidentData) => {
  try {
    const response = await axios.post(API_URL, incidentData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el incidente:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener todos los incidentes
export const getAllIncidents = async () => {
  try {
    const response = await axios.get(`${API_URL}/incidents`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los incidentes:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener estudiantes en seguimiento
export const getStudentsInFollowUp = async () => {
  try {
    const response = await axios.get(`${API_URL}/students-follow`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estudiantes en seguimiento:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener incidentes de un estudiante específico
export const getIncidentsByStudentId = async (studentId) => {
  const response = await axios.get(`${API_URL}/students/${studentId}`);
  return response.data;
};

// Actualizar el estado del incidente (resolved o pending)
export const updateIncident = async (incidentId, data) => {
  const response = await axios.put(`${API_URL}/${incidentId}`, data);
  return response.data;
};

