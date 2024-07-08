import { FilterValue } from ".";

export const getDefaultFilter = (
  value: FilterValue[],
  nested = false
): FilterValue => {
  return {
    compound: value.length === 0 ? ("where" as const) : ("" as const),
    property: "",
    type: "string" as const,
    operator: "",
    value: "",
    nested: nested
      ? [
          {
            compound: "where" as const,
            property: "",
            type: "string" as const,
            operator: "",
            value: "",
            nested: [],
          },
        ]
      : [],
  };
};
