export type FilterType = "rich_text" | "select";

type Option = { property: string; label: string } & (
  | { type: "rich_text" }
  | { type: "select"; options: string[] }
);
export type Options = Readonly<Option[]>;

export type Compound = "and" | "or" | "where";

export type FilterValue = {
  compound: Compound;
  property: string;
  type: FilterType;
  operator: string;
  value: string;
  nested: FilterValue[];
};

export type FilterComponentProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  option: Option;
};
