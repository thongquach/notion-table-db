import { MenuItem, Select } from "@mui/material";
import { OPERATORS_MAP } from "./const";
import { FilterComponentProps, FilterValue } from "./types";

const SelectFilter = ({ value, onChange, option }: FilterComponentProps) => {
  const handleChange = (newValue: string, property: keyof FilterValue) => {
    onChange({ ...value, [property]: newValue });
  };

  return (
    <>
      <Select
        value={value.operator}
        onChange={(event) => handleChange(event.target.value, "operator")}
        sx={{ minWidth: 200 }}
      >
        {OPERATORS_MAP.select.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {option.type === "select" && (
        <Select
          value={value.value}
          onChange={(event) => handleChange(event.target.value, "value")}
          sx={{ minWidth: 200 }}
        >
          {option.options.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};

export default SelectFilter;
