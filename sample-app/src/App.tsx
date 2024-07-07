import Box from "@mui/material/Box";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useState } from "react";

// Copy the payload shape interface from our server
// We want to copy (rather than import) since we we won't necessarily deploy our
// front end and back end to the same place
interface ThingToLearn {
  label: string;
  url: string;
}

function App() {
  // A state value will store the current state of the array of data which can be updated
  // by editing your database in Notion and then pressing the fetch button again
  const [thingsToLearn, setThingsToLearn] = useState<ThingToLearn[]>([]);
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100000,
    editable: true,
  });

  return (
    <div>
      <h1>Sales CRM</h1>
      <button
        type="button"
        onClick={() => {
          fetch("http://localhost:8000/")
            .then((response) => response.json())
            .then((payload) => {
              // Set the React state with the array response
              setThingsToLearn(payload);
            });
        }}
      >
        Fetch List
      </button>

      {/* Map the resulting object array into an ordered HTML list with anchor links */}
      {/* Using index as key is harmless since we will only ever be replacing the full list */}
      <ol>
        {thingsToLearn.map((thing, idx) => {
          return (
            <li key={idx}>
              <a href={thing.url} target="_blank" rel="noopener noreferrer">
                {thing.label}
              </a>
            </li>
          );
        })}
      </ol>
      <Box sx={{ height: 520, width: "100%" }}>
        <DataGridPro
          {...data}
          loading={data.rows.length === 0}
          rowHeight={38}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default App;
