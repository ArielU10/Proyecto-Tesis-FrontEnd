// src/services/studentApi.js
import axios from "axios";

export const getStudentsByCourse = async (courseId) => {
  const res = await axios.get(`http://localhost:3000/api/students/course/${courseId}`);
  return res.data;
};
