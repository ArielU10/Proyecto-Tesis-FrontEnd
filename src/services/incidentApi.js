import axios from "axios";

const API_URL = "http://localhost:3000/api/incidents";

export const createIncident = async (incidentData) => {
  try {
    const response = await axios.post(API_URL, incidentData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el incidente:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllIncidents = async () => {
  try {
    const response = await axios.get(`${API_URL}/incidents`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los incidentes:", error.response?.data || error.message);
    throw error;
  }
};