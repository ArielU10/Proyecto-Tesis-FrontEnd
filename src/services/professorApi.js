import axios from "axios";

const API_URL = "http://localhost:3000/api/professors";

// Función auxiliar para incluir el token en los headers
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Obtener profesor por ID
export const getProfessorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del profesor:", error.response?.data || error.message);
    return null;
  }
};
export const updateProfessorPhone = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/professors/${id}/phone`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el teléfono del profesor:", error.response?.data || error.message);
    throw error;
  }
};
