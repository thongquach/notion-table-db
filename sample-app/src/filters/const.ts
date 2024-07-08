export const OPERATORS_MAP = {
  string: ["contains", "does not contain", "equals", "not equals"],
} as const;

export type FilterType = keyof typeof OPERATORS_MAP;
