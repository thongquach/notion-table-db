import { FC } from "react";
import MultiSelectFilter from "./SelectFilter";
import StringFilter from "./StringFilter";
import { FilterComponentProps, FilterType } from "./types";

export const OPERATORS_MAP: Record<FilterType, Array<string>> = {
  rich_text: ["contains", "does not contain", "equals", "not equals"],
  select: ["equals", "does not equals", "empty", "is not empty"],
};

export const COMPONENT_MAP: Record<FilterType, FC<FilterComponentProps>> = {
  rich_text: StringFilter,
  select: MultiSelectFilter,
};

export const COMPOUND_OPTIONS = ["and", "or"];
