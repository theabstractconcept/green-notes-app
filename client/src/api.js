import axios from "axios";

const api = axios.create({
  baseURL: "https://green-notes-app-rgeg.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("green-notes-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;