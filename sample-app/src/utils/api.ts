import { GridSortModel } from "@mui/x-data-grid-pro";
import axios from "axios";
import { BOOLEAN_OPERATOR } from "../Filters/Filter/const";
import { FilterValue } from "../Filters/types";
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

const replaceSpaces = (str: string) => str.replace(/\s/g, "_");

// extensibility: this function can be extended to support more filter types
// by using a map of filter types to converter functions
// for now, I combined all the filter types into one function since there are only 2 types
const toNotionFilter = (filter: FilterValue) => {
  return {
    property: filter.property,
    [filter.type]: {
      [replaceSpaces(filter.operator)]: BOOLEAN_OPERATOR.includes(
        filter.operator
      )
        ? true
        : filter.value,
    },
  };
};

const toSimpleNotionFilters = (filters: FilterValue[]) => {
  if (filters.length === 1) {
    return toNotionFilter(filters[0]);
  }

  return {
    [filters[1].compound]: filters.map((filter) => toNotionFilter(filter)),
  };
};

// NOTE: this implementation is rough and was not tested thoroughly
const toNestedNotionFilters = (filters: FilterValue[]) => {
  const mainCompound = filters[1].compound;
  const result: { [key: string]: any[] } = {
    [mainCompound]: [],
  };

  filters.forEach((filter) => {
    if (!filter.nested.length)
      result[mainCompound].push(toNotionFilter(filter));
    else {
      result[mainCompound].push(toNestedNotionFilters(filter.nested));
    }
  });

  return result;
};

export const toNotionFilters = (filters: FilterValue[]) => {
  if (filters.length === 0) {
    return [];
  }
  const isSimpleFilters = filters.every((filter) => filter.nested.length === 0);
  return isSimpleFilters
    ? toSimpleNotionFilters(filters)
    : toNestedNotionFilters(filters);
};

export const getCustomers = async (
  sortModel?: GridSortModel,
  filters?: FilterValue[]
) => {
  const response = await api.get("/customer", {
    params: {
      sortModel: sortModel ? toNotionSortModel(sortModel) : undefined,
      filters: filters ? toNotionFilters(filters) : undefined,
    },
  });
  return response.data as Customer[];
};

export default api;
