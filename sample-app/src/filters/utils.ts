import { OPERATORS_MAP } from "./const";
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
  let compound: Compound = "where";
  if (value.length === 1) {
    compound = "and";
  } else if (value.length > 1) {
    compound = value[1].compound;
  }

  return {
    compound,
    property: options[0].property,
    type: options[0].type,
    operator: OPERATORS_MAP[options[0].type][0],
    value: "",
    nested: nested
      ? [
          {
            compound: "where",
            property: options[0].property,
            type: options[0].type,
            operator: OPERATORS_MAP[options[0].type][0],
            value: "",
            nested: [],
          },
        ]
      : [],
  };
};
