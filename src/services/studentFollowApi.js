import axios from "axios";

const API_URL = "http://localhost:3000/api/incidents/students-follow";

export const getStudentsInFollowUp = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
