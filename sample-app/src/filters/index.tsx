import { Box, Button } from "@mui/material";
import { FilterType } from "./const";
import Filter from "./Filter";
import { getDefaultFilter } from "./utils";

export type FilterValue = {
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
  const handleFilterChange = (updatedFilter: FilterValue, index: number) => {
    const newValue = [
      ...value.slice(0, index),
      updatedFilter,
      ...value.slice(index + 1),
    ];
    onChange(newValue);
  };

  const addFilter = (nested = false) => {
    onChange([...value, getDefaultFilter(value, nested)]);
  };

  return (
    <Box>
      {value.map((filter, index) => (
        <Filter
          key={index}
          value={filter}
          onChange={(value) => handleFilterChange(value, index)}
          options={options}
        />
      ))}
      <Button onClick={() => addFilter()}>Add Filter Rule</Button>
      <Button onClick={() => addFilter(true)}>Add Filter Group</Button>
    </Box>
  );
};

export default Filters;
