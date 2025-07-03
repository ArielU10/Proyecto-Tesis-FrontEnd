import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// ✅ Obtener todos los guardias
export const getAllGuards = async () => {
  const response = await axios.get(`${BASE_URL}/guards`);
  return response.data;
};

// ✅ Obtener un guardia por ID
export const getGuardById = async (id) => {
  const response = await axios.get(`${BASE_URL}/guards/${id}`);
  return response.data;
};

// ✅ Crear un nuevo guardia
export const createGuard = async (data) => {
  const response = await axios.post(`${BASE_URL}/guards`, data);
  return response.data;
};

// ✅ Actualizar guardia
export const updateGuard = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/guards/${id}`, data);
  return response.data;
};

// ✅ Eliminar guardia
export const deleteGuard = async (id) => {
  const response = await axios.delete(`${BASE_URL}/guards/${id}`);
  return response.data;
};
