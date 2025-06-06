// src/services/profesorService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // cambia si tu backend usa otro puerto o ruta

// Obtener estudiantes asignados a un profesor
export const getEstudiantes = async () => {
  return axios.get(`${API_URL}/estudiantes`);
};

// Enviar asistencia
export const postAsistencias = async (asistencias) => {
  return axios.post(`${API_URL}/asistencias`, asistencias);
};

// Registrar una justificación
export const postJustificacion = async (data) => {
  return axios.post(`${API_URL}/justificaciones`, data);
};

// Registrar una falta
export const postFalta = async (data) => {
  return axios.post(`${API_URL}/faltas`, data);
};
