import { GridSortModel } from "@mui/x-data-grid-pro";
import axios from "axios";
import { FilterValue } from "../filters";
import { Customer } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const PROPERTY_MAP = {
  priority: "Priority",
  status: "Status",
  expectedClose: "Expected Close",
  added: "Added",
  phone: "Phone",
  estimatedValue: "Estimated Value",
  email: "Email",
  name: "Name",
  lastContact: "Last Contact",
  company: "Company",
} as const;

const DIRECTION_MAP = {
  asc: "ascending",
  desc: "descending",
} as const;

export const toNotionSortModel = (gridSortModel: GridSortModel) => {
  const notionSortModel = gridSortModel.map((sortObj) => {
    const { field, sort } = sortObj;

    return {
      property: PROPERTY_MAP[field as keyof typeof PROPERTY_MAP],
      direction: DIRECTION_MAP[sort as keyof typeof DIRECTION_MAP],
    };
  });

  return notionSortModel;
};

const FILTER_TYPE_MAP = {
  string: "rich_text",
} as const;

const toNotionFilter = (filter: FilterValue) => {
  return {
    property: filter.property,
    [FILTER_TYPE_MAP[filter.type]]: {
      [filter.operator]: filter.value,
    },
  };
};

export const toNotionFilters = (filters: FilterValue[]) => {
  if (filters.length === 0) {
    return [];
  }
  if (filters.length === 1) {
    return toNotionFilter(filters[0]);
  }

  return {
    [filters[1].compound]: filters.map((filter) => toNotionFilter(filter)),
  };
};

export const getCustomers = async (
  sortModel?: GridSortModel,
  filters?: FilterValue[]
) => {
  console.log({ filters, convertedFilters: toNotionFilters(filters || []) });
  const response = await api.get("/customer", {
    params: {
      sortModel: sortModel ? toNotionSortModel(sortModel) : undefined,
      filters: filters ? toNotionFilters(filters) : undefined,
    },
  });
  return response.data as Customer[];
};

export default api;
