import { Box, Button, MenuItem, Select } from "@mui/material";
import { FilterValue, Options } from ".";
import StringFilter from "./StringFilter";

const COMPONENT_MAP = {
  string: StringFilter,
};

const COMPOUND = ["and", "or", "where"];

const Filter = ({
  value,
  onChange,
  options,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  options: Options;
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

  const addFilterRule = () => {
    const newFilter = {
      id: String(Date.now()),
      compound: value.nested.length === 0 ? ("where" as const) : ("" as const),
      property: "",
      type: "string" as const,
      operator: "",
      value: "",
      nested: [],
    };
    onChange({ ...value, nested: [...value.nested, newFilter] });
  };

  const addFilterGroup = () => {
    const newFilter = {
      id: String(Date.now()),
      compound: value.nested.length === 0 ? ("where" as const) : ("" as const),
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
    onChange({ ...value, nested: [...value.nested, newFilter] });
  };

  return (
    <Box sx={{ display: "flex", m: 1 }}>
      <Select
        value={value.compound}
        onChange={(e) => handleChange(e.target.value, "compound")}
        sx={{ minWidth: 100 }}
      >
        {COMPOUND.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {value.nested.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: 1,
            p: 1,
            m: 1,
            bgcolor: "#D3D3D3",
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
            <Button onClick={addFilterRule}>Add Filter Rule</Button>
            <Button onClick={addFilterGroup}>Add Filter Group</Button>
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
