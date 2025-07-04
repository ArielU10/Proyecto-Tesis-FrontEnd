import axios from "axios";

// URLs base para los endpoints
const COURSE_API_URL = "http://localhost:3000/api/courses";
const PROFESSOR_COURSES_API_URL = "http://localhost:3000/api/professor-courses";

/**
 * Obtener todos los cursos (requiere autenticación)
 */
export const getCourses = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(COURSE_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener los cursos:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Obtener cursos asignados a un profesor específico
 * @param {number} professorId - ID del profesor
 */
export const getCoursesByProfessor = async (professorId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${PROFESSOR_COURSES_API_URL}/${professorId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener cursos por profesor:", error.response?.data || error.message);
    throw error;
  }
};
