import { GridSortModel } from "@mui/x-data-grid-pro";
import axios from "axios";
import { Customer } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getCustomers = async (sortModel?: GridSortModel) => {
  const response = await api.get("/customer", { params: { sortModel } });
  return response.data as Customer[];
};

export default api;
