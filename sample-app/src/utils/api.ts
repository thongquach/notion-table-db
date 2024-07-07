import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getCustomers = async () => {
  const response = await api.get("/customer");
  return response.data;
};

export default api;
