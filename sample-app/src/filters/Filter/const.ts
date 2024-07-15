import { FC } from "react";
import { FilterComponentProps, FilterType } from "../types";
import RichTextFilter from "./RichTextFilter";
import SelectFilter from "./SelectFilter";

// extensibility: you can add more filter types here
export const OPERATORS_MAP: Record<FilterType, Array<string>> = {
  rich_text: ["contains", "does not contain", "equals", "not equals"],
  select: ["equals", "does not equal", "empty", "is not empty"],
};

export const BOOLEAN_OPERATOR = ["empty", "is not empty"];

// extensibility: you can add more filter types here
export const COMPONENT_MAP: Record<FilterType, FC<FilterComponentProps>> = {
  rich_text: RichTextFilter,
  select: SelectFilter,
};

export const COMPOUND_OPTIONS = ["and", "or"];
