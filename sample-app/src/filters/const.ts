import StringFilter from "./StringFilter";

export const OPERATORS_MAP = {
  string: ["contains", "does not contain", "equals", "not equals"],
} as const;

export const COMPONENT_MAP = {
  string: StringFilter,
};

export type FilterType = keyof typeof OPERATORS_MAP;

export const COMPOUND = ["and", "or", "where"];
