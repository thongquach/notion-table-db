import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { OPERATORS_MAP } from "./const";

const StringFilter = ({
  operator,
  setOperator,
  value,
  setValue,
}: {
  operator: string;
  setOperator: (operator: string) => void;
  value: string;
  setValue: (value: string) => void;
}) => {
  const handleOperatorChange = (event: SelectChangeEvent) => {
    setOperator(event.target.value as string);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Select
        value={operator}
        onChange={handleOperatorChange}
        sx={{ minWidth: 100 }}
      >
        {OPERATORS_MAP.string.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <TextField value={value} onChange={handleValueChange} />
    </>
  );
};

export default StringFilter;
