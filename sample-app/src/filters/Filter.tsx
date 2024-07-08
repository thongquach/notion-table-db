import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { COMPONENT_MAP, COMPOUND_OPTIONS } from "./const";
import { FilterValue, Options } from "./types";
import { getDefaultFilter } from "./utils";

const Filter = ({
  value,
  onChange,
  options,
  disableCompound = false,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  options: Options;
  disableCompound?: boolean;
}) => {
  const handleChange = (
    newValue: string | undefined,
    property: keyof FilterValue
  ) => {
    onChange({ ...value, [property]: newValue });
  };

  const handleNestedChange = (newValue: FilterValue, index: number) => {
    onChange({
      ...value,
      nested: value.nested.map((v, i) => (i === index ? newValue : v)),
    });
  };

  const FilterComponent = value.type && COMPONENT_MAP[value.type];

  const addFilter = (nested = false) => {
    onChange({
      ...value,
      nested: [
        ...value.nested,
        getDefaultFilter({ value: value.nested, nested, options }),
      ],
    });
  };

  return (
    <Box sx={{ display: "flex", m: 1, alignItems: "center" }}>
      {value.compound === "where" ? (
        <Typography sx={{ minWidth: 100 }}>Where</Typography>
      ) : (
        <Select
          value={value.compound}
          onChange={(e) => handleChange(e.target.value, "compound")}
          disabled={disableCompound}
          sx={{ minWidth: 100 }}
        >
          {COMPOUND_OPTIONS.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      )}
      {value.nested.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: 1,
            p: 1,
            m: 1,
            bgcolor: "#D1D1D1",
          }}
        >
          {value.nested.map((nestedValue, index) => (
            <Filter
              key={index}
              value={nestedValue}
              onChange={(newValue) => handleNestedChange(newValue, index)}
              options={options}
            />
          ))}
          <Box>
            <Button onClick={() => addFilter()}>Add Filter Rule</Button>
            <Button onClick={() => addFilter(true)}>Add Filter Group</Button>
          </Box>
        </Box>
      ) : (
        <>
          <Select
            value={value.property}
            onChange={(e) => handleChange(e.target.value, "property")}
            sx={{ minWidth: 100 }}
          >
            {options.map(({ property, label }) => (
              <MenuItem key={property} value={property}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {FilterComponent && (
            <FilterComponent
              operator={value.operator || ""}
              setOperator={(operator) => handleChange(operator, "operator")}
              value={value.value || ""}
              setValue={(value) => handleChange(value, "value")}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Filter;
