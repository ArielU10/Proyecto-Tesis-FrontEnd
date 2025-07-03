import axios from "axios";

const COURSE_API_URL = "http://localhost:3000/api/courses";
const PROFESSOR_COURSES_API_URL = "http://localhost:3000/api/professor-courses";

/**
 * ✅ Obtener todos los cursos
 */
export const getAllCourses = async () => {
  try {
    const response = await axios.get(COURSE_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cursos:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Obtener un curso por ID
 */
export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${COURSE_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener curso:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Crear nuevo curso
 */
export const createCourse = async (data) => {
  try {
    const response = await axios.post(COURSE_API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear curso:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Actualizar curso
 */
export const updateCourse = async (id, data) => {
  try {
    const response = await axios.put(`${COURSE_API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar curso:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Eliminar curso
 */
export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${COURSE_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar curso:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Obtener cursos asignados a un profesor
 */
export const getCoursesByProfessor = async (professorId) => {
  try {
    const response = await axios.get(`${PROFESSOR_COURSES_API_URL}/${professorId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cursos por profesor:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Asignar curso a profesor
 */
export const assignCourseToProfessor = async ({ professorId, courseId }) => {
  try {
    const response = await axios.post(PROFESSOR_COURSES_API_URL, {
      professorId,
      courseId,
    });
    return response.data;
  } catch (error) {
    console.error("Error al asignar curso:", error.response?.data || error.message);
    throw error;
  }
};
