import { MenuItem, Select, TextField } from "@mui/material";
import { FilterComponentProps, FilterValue } from "../types";
import { OPERATORS_MAP } from "./const";

const RichTextFilter = ({ value, onChange }: FilterComponentProps) => {
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
        {OPERATORS_MAP.rich_text.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <TextField
        value={value.value}
        onChange={(event) => handleChange(event.target.value, "value")}
      />
    </>
  );
};

export default RichTextFilter;
