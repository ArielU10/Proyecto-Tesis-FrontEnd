import axios from "axios";

const API_URL = "http://localhost:3000/api/asistances";

export const createAsistance = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
