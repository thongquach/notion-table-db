import { GridSortModel } from "@mui/x-data-grid-pro";
import axios from "axios";
import { FilterValue } from "../filters";
import { Customer } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const TYPE_MAP = {
  string: "rich_text",
} as const;

const convertFilters = (filters?: FilterValue[]) => {
  if (filters?.length === 1) {
    return filters.map((filter) => {
      return {
        property: filter.property,
        [TYPE_MAP[filter.type]]: {
          [filter.operator]: filter.value,
        },
      };
    });
  }
  return []; // Return an empty array or handle other cases as needed
};

export const getCustomers = async (
  sortModel?: GridSortModel,
  filters?: FilterValue[]
) => {
  console.log({ filters, converted: convertFilters(filters) });
  const response = await api.get("/customer", {
    params: { sortModel, filters: convertFilters(filters) },
  });
  return response.data as Customer[];
};

export default api;
