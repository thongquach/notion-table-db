import { OPERATORS_MAP } from "./Filter/const";
import { Compound, FilterValue, Options } from "./types";

export const getDefaultFilter = ({
  value,
  nested,
  options,
}: {
  value: FilterValue[];
  nested: boolean;
  options: Options;
}): FilterValue => {
  const defaultOption = options[0];

  let compound: Compound = "where";
  if (value.length === 1) {
    compound = "and";
  } else if (value.length > 1) {
    compound = value[1].compound;
  }

  return {
    compound,
    property: defaultOption.property,
    type: defaultOption.type,
    operator: OPERATORS_MAP[defaultOption.type][0],
    value: "",
    nested: nested
      ? [
          {
            compound: "where",
            property: defaultOption.property,
            type: defaultOption.type,
            operator: OPERATORS_MAP[defaultOption.type][0],
            value: "",
            nested: [],
          },
        ]
      : [],
  };
};
