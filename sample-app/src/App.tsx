import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGridPro, GridSortModel } from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";
import { Customer } from "./types";
import { getCustomers } from "./utils/api";

function App() {
  const [customer, setCustomers] = useState<Customer[]>([]);
  const data = {
    rows: customer,
    columns: [
      { field: "name", headerName: "Name", width: 150 },
      { field: "company", headerName: "Company", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "phone", headerName: "Phone", width: 150 },
      { field: "estimatedValue", headerName: "Estimated Value", width: 150 },
      { field: "lastContact", headerName: "Last Contact", width: 150 },
      { field: "expectedClose", headerName: "Expected Close", width: 150 },
      { field: "status", headerName: "Status", width: 150 },
      { field: "priority", headerName: "Priority", width: 150 },
    ],
  };

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const fetchCustomer = async (sortModel: GridSortModel) => {
    const customers = await getCustomers(sortModel);
    setCustomers(customers);
  };

  useEffect(() => {
    fetchCustomer([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography variant="h3">Sales CRM</Typography>
      <Button onClick={() => fetchCustomer([])}>Fetch Customers</Button>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          {...data}
          loading={data.rows.length === 0}
          rowHeight={40}
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => {
            setCustomers([]);
            setSortModel(newSortModel);
            fetchCustomer(newSortModel);
          }}
        />
      </Box>
    </Box>
  );
}

export default App;
