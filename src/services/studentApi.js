import axios from "axios";

export const getStudentsByCourse = async (courseId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/by_course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estudiantes por curso:", error);
    throw error;
  }
};
