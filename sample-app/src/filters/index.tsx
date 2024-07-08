import { Box, Button } from "@mui/material";
import Filter from "./Filter";
import { FilterValue, Options } from "./types";
import { getDefaultFilter } from "./utils";

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
    onChange([...value, getDefaultFilter({ value, nested, options })]);
  };

  return (
    <Box>
      {value.map((filter, index) => (
        <Filter
          key={index}
          value={filter}
          onChange={(value) => handleFilterChange(value, index)}
          options={options}
          disableCompound={index > 1}
        />
      ))}
      <Button onClick={() => addFilter()}>Add Filter Rule</Button>
      <Button onClick={() => addFilter(true)}>Add Filter Group</Button>
    </Box>
  );
};

export default Filters;
