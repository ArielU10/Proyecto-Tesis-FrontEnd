import axios from "axios";

const API_URL = "http://localhost:3000/api/incidents";

export const createIncident = async (incidentData) => {
  const response = await axios.post(API_URL, incidentData);
  return response.data;
};
