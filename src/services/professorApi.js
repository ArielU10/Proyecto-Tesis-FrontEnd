import axios from "axios";

const API_URL = "http://localhost:3000/api/professors";

export const getProfessorById = async (professorId) => {
  const response = await axios.get(`${API_URL}/${professorId}`);
  return response.data;
};
