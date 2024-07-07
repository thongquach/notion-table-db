import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";
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

  const fetchCustomers = async () => {
    const customers = await getCustomers();
    setCustomers(customers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Box>
      <Typography variant="h3">Sales CRM</Typography>
      <Button onClick={fetchCustomers}>Fetch Customers</Button>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          {...data}
          loading={data.rows.length === 0}
          rowHeight={38}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default App;
