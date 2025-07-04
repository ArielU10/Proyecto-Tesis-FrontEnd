import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// ✅ Obtener todos los profesores (con user_name incluido)
export const getAllProfessors = async () => {
  const response = await axios.get(`${BASE_URL}/professors`);
  return response.data;
};

// ✅ Obtener profesor por ID
export const getProfessorById = async (id) => {
  const response = await axios.get(`${BASE_URL}/professors/${id}`);
  return response.data;
};

// ✅ Crear nuevo profesor (incluye asignación de cursos y usuario)
export const createProfessor = async (data) => {
  const response = await axios.post(`${BASE_URL}/professors`, data);
  return response.data;
};

// ✅ Actualizar profesor
export const updateProfessor = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/professors/${id}`, data);
  return response.data;
};

// ✅ Eliminar profesor
export const deleteProfessor = async (id) => {
  const response = await axios.delete(`${BASE_URL}/professors/${id}`);
  return response.data;
};
