// src/services/studentApi.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";


export const getStudentsByCourse = async (courseId) => {
  try {
    const response = await axios.get(`${BASE_URL}/students/by_course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estudiantes por curso:", error);
    throw error;
  }
};

export const searchStudentsByLastNameAndProfessor = async (apellido, id_professor) => {
  try {
    const response = await axios.get(`${BASE_URL}/students/search/${apellido}/${id_professor}`);
    return response.data;
  } catch (error) {
    console.error("Error en búsqueda de estudiantes:", error);
    throw error;
  }
};

// ✅ Nuevas funciones CRUD

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/students`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los estudiantes:", error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estudiante por ID:", error);
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${BASE_URL}/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
    throw error;
  }
};
