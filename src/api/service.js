import axios from "axios";
const service = axios.create({
  baseURL: "http://localhost:7856/api",
});


service.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

service.interceptors.response.use((response) => {
  return response.data;
});

export default service;
