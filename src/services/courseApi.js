import axios from "axios";

// URLs base para los endpoints
const COURSE_API_URL = "http://localhost:3000/api/courses";
const PROFESSOR_COURSES_API_URL = "http://localhost:3000/api/professor-courses";

/**
 * Obtener todos los cursos (sin importar profesor)
 */
export const getCourses = async () => {
  try {
    const response = await axios.get(COURSE_API_URL);
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
    console.log("professorId:", professorId); 
    const response = await axios.get(`${PROFESSOR_COURSES_API_URL}/${professorId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cursos por profesor:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un curso por su ID
 * @param {number} courseId - ID del curso
 */
export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${COURSE_API_URL}/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el curso:", error.response?.data || error.message);
    throw error;
  }
};
