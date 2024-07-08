import { Button, Container, Typography } from "@mui/material";
import { DataGridPro, GridSortModel } from "@mui/x-data-grid-pro";
import { useEffect, useMemo, useState } from "react";
import Filters from "./filters";
import { FilterValue } from "./filters/types";
import { Customer } from "./types";
import { getCustomers } from "./utils/api";

const FILTER_OPTIONS = [
  { property: "Name", label: "Name", type: "rich_text" },
  { property: "Company", label: "Company", type: "rich_text" },
  {
    property: "Status",
    label: "Status",
    type: "select",
    options: [
      "Negotiation",
      "Closed",
      "Proposal",
      "Lost",
      "Qualified",
      "Lead",
    ] as string[],
  },
  {
    property: "Priority",
    label: "Priority",
    type: "select",
    options: ["High", "Medium", "Low"] as string[],
  },
  { property: "Email", label: "Email", type: "rich_text" },
  { property: "Phone", label: "Phone", type: "rich_text" },
] as const;

function App() {
  const [customer, setCustomers] = useState<Customer[]>([]);
  const columns = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 150 },
      { field: "company", headerName: "Company", width: 150 },
      { field: "status", headerName: "Status", width: 150 },
      { field: "priority", headerName: "Priority", width: 150 },
      { field: "estimatedValue", headerName: "Estimated Value", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "phone", headerName: "Phone", width: 150 },
      { field: "expectedClose", headerName: "Expected Close", width: 150 },
      { field: "lastContact", headerName: "Last Contact", width: 150 },
    ],
    []
  );
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomer = async (
    sortModel?: GridSortModel,
    filters?: FilterValue[]
  ) => {
    try {
      setLoading(true);
      setCustomers([]);
      const customers = await getCustomers(sortModel, filters);
      setCustomers(customers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography variant="h3">Sales CRM</Typography>
      {/* reusability: this Filters component can be reused. The interface is simple and hides all implementation details */}
      <Filters value={filters} onChange={setFilters} options={FILTER_OPTIONS} />
      <Button onClick={() => fetchCustomer(sortModel, filters)}>
        Apply Filter
      </Button>
      <DataGridPro
        rows={customer}
        columns={columns}
        loading={loading}
        rowHeight={40}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => {
          setSortModel(newSortModel);
          fetchCustomer(newSortModel, filters);
        }}
        disableColumnMenu
        style={{ height: 600 }}
      />
    </Container>
  );
}

export default App;
