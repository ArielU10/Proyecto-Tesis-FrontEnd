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

export const getAtrazosByCourseAndProfessor = async (id_professor, id_course) => {
  const response = await axios.get(`${API_URL}/professor/${id_professor}/courses/${id_course}/atrasos`);
  return response.data;
};

export const getInasistenciasPorCurso = async (professorId, courseId) => {
  const response = await axios.get(`${API_URL}/professor/${professorId}/courses/${courseId}/inasistencias`);
  return response.data;
};



export const checkAsistenciaTomada = async (id_course, id_professor) => {
  const res = await fetch(`http://localhost:3000/api/asistances/check/${id_course}/${id_professor}`);

  if (!res.ok) {
    const text = await res.text(); // lee lo que devolvió (HTML)
    throw new Error("Error en la API de asistencia: " + text);
  }

  const data = await res.json();
  return data=== true;;
};
