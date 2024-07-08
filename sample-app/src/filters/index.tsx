import { Box, Button } from "@mui/material";
import { FilterType } from "./const";
import Filter from "./Filter";

export type FilterValue = {
  id: string;
  compound: "and" | "or" | "where" | "";
  property: string;
  type: FilterType;
  operator: string;
  value: string;
  nested: FilterValue[];
};

type Option = { property: string; label: string; type: FilterType };
export type Options = Readonly<Option[]>;

const Filters = ({
  value,
  onChange,
  options,
}: {
  value: FilterValue[];
  onChange: (value: FilterValue[]) => void;
  options: Options;
}) => {
  const handleFilterChange = (updatedFilter: FilterValue) => {
    const index = value.findIndex((filter) => filter.id === updatedFilter.id);
    if (index !== -1) {
      const newValue = [
        ...value.slice(0, index),
        updatedFilter,
        ...value.slice(index + 1),
      ];
      onChange(newValue);
    }
  };

  const addFilterRule = () => {
    const newFilter = {
      id: String(Date.now()),
      compound: value.length === 0 ? ("where" as const) : ("" as const),
      property: "",
      type: "string" as const,
      operator: "",
      value: "",
      nested: [],
    };
    onChange([...value, newFilter]);
  };

  const addFilterGroup = () => {
    const newFilter = {
      id: String(Date.now()),
      compound: value.length === 0 ? ("where" as const) : ("" as const),
      property: "",
      type: "string" as const,
      operator: "",
      value: "",
      nested: [
        {
          id: String(Date.now()),
          compound: "where" as const,
          property: "",
          type: "string" as const,
          operator: "",
          value: "",
          nested: [],
        },
      ],
    };
    onChange([...value, newFilter]);
  };

  return (
    <Box>
      {value.map((filter, index) => (
        <Filter
          key={index}
          value={filter}
          onChange={handleFilterChange}
          options={options}
        />
      ))}
      <Button onClick={addFilterRule}>Add Filter Rule</Button>
      <Button onClick={addFilterGroup}>Add Filter Group</Button>
    </Box>
  );
};

export default Filters;
