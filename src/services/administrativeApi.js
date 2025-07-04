import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// ✅ Obtener todos los administrativos
export const getAllAdministratives = async () => {
  const response = await axios.get(`${BASE_URL}/administratives`);
  return response.data;
};

// ✅ Obtener un administrativo por ID
export const getAdministrativeById = async (id) => {
  const response = await axios.get(`${BASE_URL}/administratives/${id}`);
  return response.data;
};

// ✅ Crear un nuevo administrativo
export const createAdministrative = async (data) => {
  const response = await axios.post(`${BASE_URL}/administratives`, data);
  return response.data;
};

// ✅ Actualizar un administrativo
export const updateAdministrative = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/administratives/${id}`, data);
  return response.data;
};

// ✅ Eliminar un administrativo
export const deleteAdministrative = async (id) => {
  const response = await axios.delete(`${BASE_URL}/administratives/${id}`);
  return response.data;
};

// ✅ Validar token QR (uso exclusivo para seguridad)
export const validateQRToken = async (token) => {
  const response = await axios.get(`${BASE_URL}/validate-token/${token}`);
  return response.data;
};
