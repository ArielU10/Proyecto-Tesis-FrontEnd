import axios from "axios";

const API_URL = "http://localhost:3000/api/asistances";

export const createAsistance = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getInasistenciasByCourse = async (courseId) => {
  const response = await axios.get(`${API_URL}/course/${courseId}?status=absent`);
  return response.data;
};

export const getInasistenciasPorCurso = async (professorId, courseId) => {
  const response = await axios.get(`${API_URL}/professor/${professorId}/courses/${courseId}/inasistencias`);
  return response.data;
};