import StringFilter from "./StringFilter";

export const OPERATORS_MAP = {
  string: ["contains", "does not contain", "equals", "not equals"],
} as const;

export const COMPONENT_MAP = {
  string: StringFilter,
};

export const COMPOUND_OPTIONS = ["and", "or"];
