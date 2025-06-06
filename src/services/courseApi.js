import axios from "axios";

const API_URL = "http://localhost:3000/api/courses";

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    return [];
  }
};
