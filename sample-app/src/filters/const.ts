import { FC } from "react";
import RichTextFilter from "./RichTextFilter";
import MultiSelectFilter from "./SelectFilter";
import { FilterComponentProps, FilterType } from "./types";

export const OPERATORS_MAP: Record<FilterType, Array<string>> = {
  rich_text: ["contains", "does not contain", "equals", "not equals"],
  select: ["equals", "does not equals", "empty", "is not empty"],
};

export const COMPONENT_MAP: Record<FilterType, FC<FilterComponentProps>> = {
  rich_text: RichTextFilter,
  select: MultiSelectFilter,
};

export const COMPOUND_OPTIONS = ["and", "or"];
