import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import Filter from "./Filter";
import { FilterValue, Options } from "./types";
import { getDefaultFilter } from "./utils";

// TODO: implement delete
const Filters = ({
  value,
  onChange,
  options,
}: {
  value: FilterValue[];
  onChange: (value: FilterValue[]) => void;
  options: Options;
}) => {
  const compound = value.length >= 2 ? value[1].compound : "and";
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

  useEffect(() => {
    onChange(
      value.map((filter, index) =>
        index < 1 ? filter : { ...filter, compound }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compound]);

  return (
    <Box>
      {value.map((filter, index) => (
        <Filter
          key={index}
          value={filter}
          onChange={(value) => handleFilterChange(value, index)}
          options={options}
          index={index}
        />
      ))}
      <Button onClick={() => addFilter()}>Add Filter Rule</Button>
      <Button onClick={() => addFilter(true)}>Add Filter Group</Button>
    </Box>
  );
};

export default Filters;
