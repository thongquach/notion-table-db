import { OPERATORS_MAP } from "./const";

export type FilterType = keyof typeof OPERATORS_MAP;
export type Compound = "and" | "or" | "where";

export type FilterValue = {
  compound: Compound;
  property: string;
  type: FilterType;
  operator: string;
  value: string;
  nested: FilterValue[];
};

type Option = { property: string; label: string; type: FilterType };
export type Options = Readonly<Option[]>;
